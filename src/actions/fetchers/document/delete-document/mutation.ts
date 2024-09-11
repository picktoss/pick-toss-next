import { useMutation } from '@tanstack/react-query'
import { deleteDocument } from '.'
import { getQueryClient } from '@/shared/lib/tanstack-query/client'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { useSession } from 'next-auth/react'
import { GetDocumentsForCategoryResponse } from '../get-documents-for-category'

export const useDeleteDocumentMutation = ({
  categoryId,
  sortOption,
}: {
  categoryId: number
  sortOption: 'createdAt' | 'name' | 'updatedAt'
}) => {
  const queryClient = getQueryClient()
  const { update } = useSession()

  return useMutation({
    mutationFn: deleteDocument,
    onMutate: async ({ documentId }) => {
      await queryClient.cancelQueries({
        queryKey: queries.document.list(categoryId, sortOption).queryKey,
      })

      const prev = queryClient.getQueryData<GetDocumentsForCategoryResponse>(
        queries.document.list(categoryId, sortOption).queryKey
      )

      try {
        queryClient.setQueryData(
          queries.document.list(categoryId, sortOption).queryKey,
          (prev: GetDocumentsForCategoryResponse) => ({
            documents: prev.documents.filter((document) => document.id !== documentId),
          })
        )
      } catch (e) {
        console.error(e)
      }

      return prev?.documents
    },
    onError: (_, __, context) => {
      if (context) {
        queryClient.setQueryData(queries.document.list(categoryId, sortOption).queryKey, context)
      }
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queries.document._def }),
        queryClient.invalidateQueries({ queryKey: queries.category.list().queryKey }),
      ])
      await update({})
    },
  })
}
