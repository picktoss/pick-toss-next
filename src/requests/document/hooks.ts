'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchDocuments } from '.'

export const useGetDocuments = (directoryId: string | null, sortOption: Document.Sort) => {
  return useQuery({
    queryKey: ['getDocuments', directoryId, sortOption],
    queryFn: async () => fetchDocuments(directoryId, sortOption),
  })
}
