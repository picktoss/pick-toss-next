'use client'

import { useQuery } from '@tanstack/react-query'
import { getKeyPointsById } from '.'
import { DocumentStatus } from '@/actions/types/dto/document.dto'

export const GET_KEY_POINTS_BY_ID_KEY = 'key-points-by-id'

interface Params {
  documentId: number

  initialData: {
    documentStatus: DocumentStatus
    keyPoints: {
      id: number
      question: string
      answer: string
      bookmark: boolean
    }[]
  }
}

export const useGetKeyPointsByIdQuery = ({ documentId, initialData }: Params) => {
  return useQuery({
    queryKey: [GET_KEY_POINTS_BY_ID_KEY, documentId],
    queryFn: () =>
      getKeyPointsById({
        documentId,
      }),
    initialData,

    retry: false,
  })
}
