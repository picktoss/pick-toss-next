import { getQueryClient } from '@/shared/lib/tanstack-query/client'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  createCollection,
  getBookmarkedCollections,
  getAllCollections,
  deleteBookmark,
  createBookmark,
  getMyCollections,
  getCollectionInfo,
  getRandomCollectionQuizzes,
  deleteCollection,
  updateCollectionInfo,
  updateCollectionQuizzes,
  searchCollections,
  addQuizToCollection,
  complaintCollection,
} from './client'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { useUser } from '@/shared/hooks/use-user'

export const useCollections = (props?: {
  collectionSortOption: 'POPULARITY' | 'UPDATED'
  collectionCategories: Collection.Field[]
  quizType?: 'MIX_UP' | 'MULTIPLE_CHOICE'
  quizCount: number
}) => {
  return useQuery({
    queryKey: ['collections', JSON.stringify(props)],
    queryFn: async () => getAllCollections(props),
  })
}

export const useCollectionInfo = (collectionId: number) => {
  const { user } = useUser()

  return useQuery({
    queryKey: ['collectionInfo', collectionId],
    queryFn: async () => getCollectionInfo({ collectionId }),
    retry: false,
    enabled: !!user?.id,
  })
}

export const useMyCollections = () => {
  return useQuery({
    queryKey: ['myCollections'],
    queryFn: async () => getMyCollections(),
  })
}

export const useBookmarkedCollections = () => {
  return useQuery({
    queryKey: ['bookmarkedCollections'],
    queryFn: async () => getBookmarkedCollections(),
  })
}

export const useRandomCollectionQuizzes = (categoryId?: string) => {
  return useQuery({
    queryKey: ['randomCollectionQuizzes', categoryId],
    queryFn: async () => getRandomCollectionQuizzes({ categoryId: categoryId! }),
    enabled: categoryId != null,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
  })
}

export const useCreateCollection = () => {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (payload: Collection.Request.CreateCollection) => createCollection(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['collections'] })
    },
  })
}

export const useBookmarkMutation = () => {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async ({
      collectionId,
      isBookMarked,
    }: {
      collectionId: number
      isBookMarked: boolean
    }) => {
      if (isBookMarked) {
        return deleteBookmark(collectionId)
      }
      return createBookmark(collectionId)
    },
    onMutate: async ({ collectionId, isBookMarked }) => {
      // 진행 중인 쿼리들 취소
      await Promise.all([
        queryClient.cancelQueries({ queryKey: ['collections'] }),
        queryClient.cancelQueries({ queryKey: ['bookmarkedCollections'] }),
        queryClient.cancelQueries({ queryKey: ['collectionInfo', collectionId] }),
        queryClient.cancelQueries(queries.collection.interestedCategory()),
      ])

      const collectionsQueries = queryClient.getQueriesData<Collection.Response.GetAllCollections>({
        queryKey: ['collections'],
      })

      const previousDataMap = new Map()

      // 모든 collections 쿼리에 대해 낙관적 업데이트 수행
      collectionsQueries.forEach(([queryKey, data]) => {
        if (data?.collections) {
          // 이전 데이터 저장
          previousDataMap.set(queryKey, data)

          // 낙관적 업데이트
          queryClient.setQueryData(queryKey, {
            ...data,
            collections: data.collections.map((collection) => {
              if (collection.id === collectionId) {
                return {
                  ...collection,
                  bookmarked: !isBookMarked,
                  bookmarkCount: isBookMarked
                    ? collection.bookmarkCount - 1
                    : collection.bookmarkCount + 1,
                }
              }
              return collection
            }),
          })
        }
      })

      // 북마크된 컬렉션 데이터 처리
      const previousBookmarkedCollections =
        queryClient.getQueryData<Collection.Response.GetBookmarkedCollections>([
          'bookmarkedCollections',
        ])

      if (previousBookmarkedCollections?.collections) {
        if (isBookMarked) {
          // 북마크 제거 시
          queryClient.setQueryData<Collection.Response.GetBookmarkedCollections>(
            ['bookmarkedCollections'],
            {
              ...previousBookmarkedCollections,
              collections: previousBookmarkedCollections.collections.filter(
                (collection) => collection.id !== collectionId
              ),
            }
          )
        } else {
          // 북마크 추가 시
          // 가장 최신의 collection 데이터를 찾기 위해 모든 collections 쿼리를 확인
          let collectionToAdd = null
          for (const [, data] of collectionsQueries) {
            const found = data?.collections.find((collection) => collection.id === collectionId)
            if (found) {
              collectionToAdd = found
              break
            }
          }

          if (collectionToAdd) {
            queryClient.setQueryData<Collection.Response.GetBookmarkedCollections>(
              ['bookmarkedCollections'],
              {
                ...previousBookmarkedCollections,
                collections: [
                  ...previousBookmarkedCollections.collections,
                  {
                    ...collectionToAdd,
                    bookmarked: true,
                    bookmarkCount: collectionToAdd.bookmarkCount + 1,
                  },
                ],
              }
            )
          }
        }
      }

      // 컬렉션 상세 낙관적 업데이트
      const previousCollectionInfo =
        queryClient.getQueryData<Collection.Response.GetCollectionInfo>([
          'collectionInfo',
          collectionId,
        ])

      if (previousCollectionInfo) {
        queryClient.setQueryData<Collection.Response.GetCollectionInfo>(
          ['collectionInfo', collectionId],
          {
            ...previousCollectionInfo,
            bookmarked: !isBookMarked,
            bookmarkCount: isBookMarked
              ? previousCollectionInfo.bookmarkCount - 1
              : previousCollectionInfo.bookmarkCount + 1,
          }
        )
      }

      // 관심 카테고리 컬렉션 데이터 저장
      const previousInterestedCategory = queryClient.getQueryData(
        queries.collection.interestedCategory().queryKey
      )

      return {
        previousDataMap,
        previousBookmarkedCollections,
        previousCollectionInfo,
        previousInterestedCategory,
      }
    },
    onError: (_, __, context) => {
      // 에러 발생 시 이전 데이터로 복구
      if (context?.previousDataMap) {
        context.previousDataMap.forEach((data, queryKey) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
      if (context?.previousBookmarkedCollections) {
        queryClient.setQueryData(['bookmarkedCollections'], context.previousBookmarkedCollections)
      }
      if (context?.previousCollectionInfo) {
        queryClient.setQueryData(
          ['collectionInfo', context.previousCollectionInfo.id],
          context.previousCollectionInfo
        )
      }
      // 관심 카테고리 데이터 복구
      if (context?.previousInterestedCategory) {
        queryClient.setQueryData(
          queries.collection.interestedCategory().queryKey,
          context.previousInterestedCategory
        )
      }
    },
    onSettled: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['collections'] }),
        queryClient.invalidateQueries({ queryKey: ['bookmarkedCollections'] }),
        queryClient.invalidateQueries({ queryKey: ['collectionInfo'] }),
        queryClient.invalidateQueries(queries.collection.interestedCategory()),
      ])
    },
  })
}

export const useDeleteCollection = () => {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: deleteCollection,
    mutationKey: ['deleteCollection'],
    onSettled: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['collections'] }),
        queryClient.invalidateQueries({ queryKey: ['myCollections'] }),
        queryClient.invalidateQueries({ queryKey: ['collectionInfo'] }),
      ])
    },
  })
}

export const useUpdateCollectionInfo = () => {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: updateCollectionInfo,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['collections'] }),
        queryClient.invalidateQueries({ queryKey: ['myCollections'] }),
        queryClient.invalidateQueries({ queryKey: ['collectionInfo'] }),
      ])
    },
  })
}

export const useUpdateCollectionQuizzes = () => {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: updateCollectionQuizzes,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['collections'] }),
        queryClient.invalidateQueries({ queryKey: ['myCollections'] }),
        queryClient.invalidateQueries({ queryKey: ['collectionInfo'] }),
      ])
    },
  })
}

export const useSearchCollections = (keyword: string) => {
  return useQuery({
    queryKey: ['collections', 'searchCollections', keyword],
    queryFn: async () => searchCollections(keyword),
  })
}

export const useAddQuizToCollection = (quizId: number) => {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (payload: { collectionId: number; requestBody: { quizId: number } }) =>
      addQuizToCollection(payload),
    onSuccess: async () => {
      // TODO: 컬렉션에 퀴즈 추가를 위한 별도 api가 생긴다면 해당 쿼리 추가
      await Promise.all([
        queryClient.invalidateQueries(queries.collection.myListForAddQuiz(quizId)),
        queryClient.invalidateQueries({ queryKey: ['collections'] }),
        queryClient.invalidateQueries({ queryKey: ['myCollections'] }),
        queryClient.invalidateQueries({ queryKey: ['collectionInfo'] }),
      ])
    },
  })
}

export const useComplaintCollection = () => {
  return useMutation({
    mutationFn: complaintCollection,
  })
}
