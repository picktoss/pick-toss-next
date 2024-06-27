'use client'

import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { getDocumentsForCategory } from './fetcher'

export const GET_DOCUMENTS_FOR_CATEGORY_KEY = 'document-for-category'
export const SORT_OPTION = ['createdAt', 'name', 'updatedAt'] as const

interface Params {
  categoryId: number
  sortOption: (typeof SORT_OPTION)[number]
}

export const useGetDocumentsForCategory = ({ categoryId, sortOption }: Params) => {
  const { data: session } = useSession()

  return useQuery({
    queryKey: [GET_DOCUMENTS_FOR_CATEGORY_KEY, categoryId, sortOption],
    queryFn: () =>
      getDocumentsForCategory({
        accessToken: session?.user.accessToken || '',
        categoryId,
        sortOption,
      }).then((res) => res.documents),
    enabled: !!session?.user.accessToken,
  })
}
