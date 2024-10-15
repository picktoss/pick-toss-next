'use client'

import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { createAiPick } from '.'
import { LOCAL_KEY } from '@/constants'
import { useAmplitudeContext } from '@/shared/hooks/use-amplitude-context'

export function useCreateAIPickMutation() {
  const { update } = useSession()
  const { aiPickEvent } = useAmplitudeContext()

  return useMutation({
    mutationFn: createAiPick,
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
