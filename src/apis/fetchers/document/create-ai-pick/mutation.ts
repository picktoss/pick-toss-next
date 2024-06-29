'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { createAiPick } from './fetcher'
import { GetKeyPointsByIdResponse } from '../../key-point/get-key-points-by-id/fetcher'
import { GET_KEY_POINTS_BY_ID_KEY } from '../../key-point/get-key-points-by-id/query'

interface Params {
  documentId: number
  rePick?: boolean
}

export function useCreateAIPickMutation() {
  const { data: session, update } = useSession()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ documentId, rePick }: Params) => {
      queryClient.setQueryData<GetKeyPointsByIdResponse>(
        [GET_KEY_POINTS_BY_ID_KEY, documentId],
        (oldData) => {
          if (!oldData) return oldData

          return {
            ...oldData,
            documentStatus: 'PROCESSING',
            keyPoints: rePick ? [] : oldData.keyPoints,
          }
        }
      )

      return createAiPick({
        accessToken: session?.user.accessToken || '',
        documentId,
      })
    },
    onSuccess: async () => await update({}),
  })
}
