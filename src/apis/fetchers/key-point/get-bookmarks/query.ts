'use client'

import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { getBookmarks } from './fetcher'

export const GET_BOOKMARKS_KEY = 'bookmarks'

export const useGetBookmarksQuery = () => {
  const { data: session } = useSession()

  return useQuery({
    queryKey: [GET_BOOKMARKS_KEY],
    queryFn: () =>
      getBookmarks({
        accessToken: session?.user.accessToken || '',
      }).then((res) => res.keyPoints),
    enabled: !!session?.user.accessToken,
  })
}
