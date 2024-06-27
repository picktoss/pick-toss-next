'use client'

import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { getKeyPointsById } from './fetcher'
import { DocumentStatus } from '@/apis/types/dto/document.dto'

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

export const useGetKeyPointsById = ({ documentId, initialData }: Params) => {
  const { data: session } = useSession()

  return useQuery({
    queryKey: [GET_KEY_POINTS_BY_ID_KEY, documentId],
    queryFn: () =>
      getKeyPointsById({
        accessToken: session?.user.accessToken || '',
        documentId,
      }),
    initialData,
  })
}
