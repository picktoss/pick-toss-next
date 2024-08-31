'use client'

import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { createAiPick } from './fetcher'
import { LOCAL_KEY } from '@/constants/local-key'
import useAmplitudeContext from '@/shared/hooks/use-amplitude-context'

interface Params {
  documentId: number
}

export function useCreateAIPickMutation() {
  const { data: session, update } = useSession()
  const { aiPickEvent } = useAmplitudeContext()

  return useMutation({
    mutationFn: ({ documentId }: Params) =>
      createAiPick({
        accessToken: session?.user.accessToken || '',
        documentId,
      }),
    onSuccess: async ({ firstUseAiPick }) => {
      aiPickEvent({
        buttonName: 'create_ai_pick_button',
        isPickedAgain: false,
      })

      await update({})

      if (firstUseAiPick) {
        localStorage.setItem(LOCAL_KEY.QUIZ_CREATING, 'true')
      }
    },
  })
}
