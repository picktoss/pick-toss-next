'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCategory } from '.'
import { queries } from '@/shared/lib/tanstack-query/v2/query-keys'

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createCategory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queries.category.list().queryKey })
    },
  })
}
