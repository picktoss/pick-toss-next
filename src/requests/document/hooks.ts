'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchDocuments } from '.'

export const useGetDocuments = (
  directoryId: string | null,
  sortOption: 'CREATED_AT' | 'UPDATED_AT'
) => {
  return useQuery({
    queryKey: ['getDocuments', directoryId, sortOption],
    queryFn: async () => fetchDocuments(directoryId, sortOption),
  })
}
