'use client'

import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { createAiPick } from './fetcher'

interface Params {
  documentId: number
}

export function useCreateAIPickMutation() {
  const { data: session, update } = useSession()

  return useMutation({
    mutationFn: ({ documentId }: Params) =>
      createAiPick({
        accessToken: session?.user.accessToken || '',
        documentId,
      }),
    onSuccess: async () => await update({}),
  })
}
