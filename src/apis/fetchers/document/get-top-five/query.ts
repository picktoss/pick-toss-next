'use client'

import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { getTopFive } from './fetcher'

export const GET_TOP_FIVE_KEY = 'document-top-five'

export const useGetTopFive = () => {
  const { data: session } = useSession()

  return useQuery({
    queryKey: [GET_TOP_FIVE_KEY],
    queryFn: () =>
      getTopFive({
        accessToken: session?.user.accessToken || '',
      }).then((res) => res.documents),
    enabled: !!session?.user.accessToken,
  })
}
