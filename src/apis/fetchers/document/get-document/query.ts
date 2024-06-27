'use client'

import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { getDocument } from './fetcher'

export const GET_DOCUMENT_KEY = 'document'

interface Params {
  documentId: number
}

export const useGetDocumentQuery = ({ documentId }: Params) => {
  const { data: session } = useSession()

  return useQuery({
    queryKey: [GET_DOCUMENT_KEY, documentId],
    queryFn: () =>
      getDocument({
        accessToken: session?.user.accessToken || '',
        documentId: documentId,
      }),
    enabled: !!session?.user.accessToken,
  })
}
