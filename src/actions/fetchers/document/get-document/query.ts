'use client'

import { useQuery } from '@tanstack/react-query'
import { getDocument } from '.'
import { queries } from '@/shared/lib/tanstack-query/query-keys'

interface Params {
  documentId: number
}

export const useGetDocumentQuery = ({ documentId }: Params) => {
  return useQuery({
    ...queries.document.item(documentId),
    queryFn: () =>
      getDocument({
        documentId,
      }),
    retry: false,
  })
}
