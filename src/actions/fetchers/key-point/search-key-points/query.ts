'use client'

import { useQuery } from '@tanstack/react-query'
import { searchKeyPoints } from '.'
import { QueryOptions } from '@/actions/types/query'

export const SEARCH_KEY_POINTS_KEY = 'search-key-points'

interface Params {
  term: string
}

export const useSearchKeyPointsQuery = ({ term }: Params, options?: QueryOptions) => {
  return useQuery({
    queryKey: [SEARCH_KEY_POINTS_KEY, term],
    queryFn: () =>
      searchKeyPoints({
        term,
      }),
    enabled: options?.enabled != null && options?.enabled,
  })
}
