'use client'

import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { reCreateAiPick } from '.'
import { useAmplitudeContext } from '@/shared/hooks/use-amplitude-context'

export function useReCreateAIPickMutation() {
  const { update } = useSession()
  const { aiPickEvent } = useAmplitudeContext()

  return useMutation({
    mutationFn: reCreateAiPick,
    onSuccess: async () => {
      aiPickEvent({
        buttonName: 're_create_ai_pick_button',
        isPickedAgain: true,
      })

      await update({})
    },
  })
}
