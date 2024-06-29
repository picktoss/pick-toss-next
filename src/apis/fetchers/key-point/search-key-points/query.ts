'use client'

import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { searchKeyPoints } from './fetcher'
import { QueryOptions } from '@/apis/types/query'

export const SEARCH_KEY_POINTS_KEY = 'search-key-points'

interface Params {
  term: string
}

export const useSearchKeyPointsQuery = ({ term }: Params, options?: QueryOptions) => {
  const { data: session } = useSession()

  return useQuery({
    queryKey: [SEARCH_KEY_POINTS_KEY, term],
    queryFn: () =>
      searchKeyPoints({
        term: term,
        accessToken: session?.user.accessToken || '',
      }),
    enabled: session?.user.accessToken != null && options?.enabled != null && options?.enabled,
  })
}
