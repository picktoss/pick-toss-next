'use client'

import { useQuery } from '@tanstack/react-query'
import { getCategories } from '.'
import { queries } from '@/shared/lib/tanstack-query/query-keys'

export const useGetCategoriesQuery = () => {
  return useQuery({
    ...queries.category.list(),
    queryFn: () => getCategories().then((res) => res.categories),
  })
}
