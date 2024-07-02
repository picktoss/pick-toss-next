'use client'

import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { reCreateAiPick } from './fetch'

interface Params {
  documentId: number
}

export function useReCreateAIPickMutation() {
  const { data: session, update } = useSession()

  return useMutation({
    mutationFn: ({ documentId }: Params) =>
      reCreateAiPick({
        accessToken: session?.user.accessToken || '',
        documentId,
      }),
    onSuccess: async () => await update({}),
  })
}
