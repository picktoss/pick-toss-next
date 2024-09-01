'use client'

import { useQuery } from '@tanstack/react-query'
import { getCategory } from '.'
import { queries } from '@/shared/lib/tanstack-query/query-keys'

interface Params {
  categoryId: number
}

export const useGetCategoryQuery = ({ categoryId }: Params) => {
  return useQuery({
    ...queries.category.item(categoryId),
    queryFn: () =>
      getCategory({
        categoryId,
      }),
  })
}
