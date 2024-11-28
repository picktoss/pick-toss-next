import { getQueryClient } from '@/shared/lib/tanstack-query/client'
import { useMutation } from '@tanstack/react-query'
import { createCollection } from '.'

export const useCreateCollection = () => {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (payload: Collection.Request.CreateCollection) => createCollection(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['collections'] })
    },
  })
}
