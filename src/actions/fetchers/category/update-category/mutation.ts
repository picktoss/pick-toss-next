'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCategory } from '.'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { Category } from '../get-categories'

export const useUpdateCategoryMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateCategory,
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: queries.category.list().queryKey })

      const prevCategories = queryClient.getQueryData<Category[]>(queries.category.list().queryKey)

      // prevCategories가 배열인지 확인 후 map 실행
      if (Array.isArray(prevCategories)) {
        queryClient.setQueryData(queries.category.list().queryKey, (prevCategories: Category[]) =>
          prevCategories.map((category) => {
            if (data.categoryId !== category.id) return category

            return {
              ...category,
              name: data.name,
              emoji: data.emoji,
              tag: data.tag,
            }
          })
        )
      }

      return prevCategories
    },
    onError: (error, __, context) => {
      console.error('Error in onError handler:', error) // 에러를 확인합니다.
      if (context) {
        queryClient.setQueryData(queries.category.list().queryKey, context)
      }
    },
    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: queries.category.list().queryKey }),
  })
}
