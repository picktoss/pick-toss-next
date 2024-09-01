'use client'

import { useQuery } from '@tanstack/react-query'
import { getBookmarks } from '.'

export const GET_BOOKMARKS_KEY = 'bookmarks'

export const useGetBookmarksQuery = () => {
  return useQuery({
    queryKey: [GET_BOOKMARKS_KEY],
    queryFn: () => getBookmarks().then((res) => res.keyPoints),
  })
}
