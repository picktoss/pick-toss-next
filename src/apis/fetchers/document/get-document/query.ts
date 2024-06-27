'use client'

import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { getDocument } from './fetcher'

export const GET_CATEGORY_KEY = 'document'

interface Params {
  documentId: number
}

export const useGetDocument = ({ documentId }: Params) => {
  const { data: session } = useSession()

  return useQuery({
    queryKey: ['document', documentId],
    queryFn: () =>
      getDocument({
        accessToken: session?.user.accessToken || '',
        documentId: documentId,
      }),
    enabled: !!session?.user.accessToken,
  })
}
