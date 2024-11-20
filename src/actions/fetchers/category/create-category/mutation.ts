'use client'

import { useMutation } from '@tanstack/react-query'
import { createCategory } from '.'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { getQueryClient } from '@/shared/lib/tanstack-query/client'

export const useCreateCategoryMutation = () => {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: createCategory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queries.category.list().queryKey })
    },
  })
}
