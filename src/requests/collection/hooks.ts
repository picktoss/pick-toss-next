import { getQueryClient } from '@/shared/lib/tanstack-query/client'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  createCollection,
  getBookmarkedCollections,
  getAllCollections,
  deleteBookmark,
  createBookmark,
  getMyCollections,
} from '.'

export const useCollections = () => {
  return useQuery({
    queryKey: ['collections'],
    queryFn: async () => getAllCollections(),
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
      ])

      // 이전 데이터 스냅샷 저장
      const previousCollections = queryClient.getQueryData<Collection.Response.GetAllCollections>([
        'collections',
      ])
      const previousBookmarkedCollections =
        queryClient.getQueryData<Collection.Response.GetBookmarkedCollections>([
          'bookmarkedCollections',
        ])

      // 전체 컬렉션 데이터 낙관적 업데이트
      queryClient.setQueryData(['collections'], (old: Collection.Response.GetAllCollections) => {
        const newCollections = {
          ...old,
          collections: old.collections.map((collection) => {
            if (collection.id === collectionId) {
              return {
                ...collection,
                bookmarkCount: isBookMarked
                  ? collection.bookmarkCount - 1
                  : collection.bookmarkCount + 1,
              }
            }
            return collection
          }),
        }
        return newCollections
      })

      // 북마크된 컬렉션 데이터 낙관적 업데이트
      queryClient.setQueryData(
        ['bookmarkedCollections'],
        (old: Collection.Response.GetBookmarkedCollections) => {
          if (isBookMarked) {
            // 북마크 제거 시 해당 컬렉션을 목록에서 제거
            return {
              ...old,
              collections: old.collections.filter((collection) => collection.id !== collectionId),
            }
          } else {
            // 북마크 추가 시 해당 컬렉션을 목록에 추가
            // collections 쿼리에서 해당 컬렉션 정보를 가져옴
            const collectionsData = queryClient.getQueryData<Collection.Response.GetAllCollections>(
              ['collections']
            )
            const collectionToAdd = collectionsData?.collections.find(
              (collection) => collection.id === collectionId
            )

            if (collectionToAdd) {
              return {
                ...old,
                collections: [...old.collections, collectionToAdd],
              }
            }
            return old
          }
        }
      )

      return { previousCollections, previousBookmarkedCollections }
    },
    onError: (err, variables, context) => {
      // 에러 발생 시 이전 데이터로 복구
      queryClient.setQueryData(['collections'], context?.previousCollections)
      queryClient.setQueryData(['bookmarkedCollections'], context?.previousBookmarkedCollections)
    },
    onSettled: async () => {
      // 작업 완료 후 캐시 무효화
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['collections'] }),
        queryClient.invalidateQueries({ queryKey: ['bookmarkedCollections'] }),
      ])
    },
  })
}
