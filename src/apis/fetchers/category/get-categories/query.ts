'use client'

import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { getCategories } from './fetcher'

export const GET_CATEGORIES_KEY = 'categories'

export const useGetCategories = () => {
  const { data: session } = useSession()

  return useQuery({
    queryKey: [GET_CATEGORIES_KEY],
    queryFn: () =>
      getCategories({
        accessToken: session?.user.accessToken || '',
      }).then((res) => res.categories),
    enabled: !!session?.user.accessToken,
  })
}
