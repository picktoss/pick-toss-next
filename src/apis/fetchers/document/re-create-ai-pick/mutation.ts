'use client'

import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { reCreateAiPick } from './fetch'
import useAmplitudeContext from '@/shared/hooks/use-amplitude-context'

interface Params {
  documentId: number
}

export function useReCreateAIPickMutation() {
  const { data: session, update } = useSession()
  const { aiPickEvent } = useAmplitudeContext()

  return useMutation({
    mutationFn: ({ documentId }: Params) =>
      reCreateAiPick({
        accessToken: session?.user.accessToken || '',
        documentId,
      }),
    onSuccess: async () => {
      aiPickEvent({
        buttonName: 're_create_ai_pick_button',
        isPickedAgain: true,
      })

      await update({})
    },
  })
}
