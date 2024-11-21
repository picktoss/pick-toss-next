'use client'

import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { updateQuizNotification } from '.'

interface Params {
  checked: boolean
}

export function useUpdateQuizNotificationMutation() {
  const { update } = useSession()

  return useMutation({
    mutationFn: ({ checked }: Params) =>
      updateQuizNotification({
        quizNotificationEnabled: checked,
      }),
    onSuccess: async () => await update({}),
  })
}
