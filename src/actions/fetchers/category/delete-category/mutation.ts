'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { deleteCategory } from '.'
import { Category } from '../get-categories'

export const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteCategory,
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: queries.category.list().queryKey })

      const prevCategories = queryClient.getQueryData<Category[]>(queries.category.list().queryKey)

      queryClient.setQueryData(queries.category.list().queryKey, (prevCategories: Category[]) =>
        prevCategories.filter((category) => data.categoryId !== category.id)
      )

      return prevCategories
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(queries.category.list().queryKey, context)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queries.category.list().queryKey }),
  })
}
