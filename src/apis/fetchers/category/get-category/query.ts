'use client'

import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { getCategory } from './fetcher'

export const GET_CATEGORY_KEY = 'category'

interface Params {
  categoryId: number
}

export const useGetCategory = ({ categoryId }: Params) => {
  const { data: session } = useSession()

  return useQuery({
    queryKey: [GET_CATEGORY_KEY, categoryId],
    queryFn: () =>
      getCategory({
        accessToken: session?.user.accessToken || '',
        categoryId,
      }),
    enabled: !!session?.user.accessToken,
  })
}
