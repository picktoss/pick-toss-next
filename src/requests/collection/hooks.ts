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
      await queryClient.cancelQueries({ queryKey: ['collections'] })

      const previousCollections = queryClient.getQueryData(['collections'])

      queryClient.setQueryData(['collections'], (old: Collection.Response.GetAllCollections) => {
        const newCollections = {
          ...old,
          collections: old.collections.map((collection) => {
            if (collection.id === collectionId) {
              return {
                ...collection,
                isBookMarked: !isBookMarked,
              }
            }
            return collection
          }),
        }
        return newCollections
      })

      return { previousCollections }
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(['collections'], context?.previousCollections)
    },
    onSettled: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['collections'] }),
        queryClient.invalidateQueries({ queryKey: ['bookmarkedCollections'] }),
      ])
    },
  })
}
