'use client'

import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { updateQuizNotification } from './fetcher'

interface Params {
  checked: boolean
}

export function useUpdateQuizNotificationMutation() {
  const { data: session, update } = useSession()

  return useMutation({
    mutationFn: ({ checked }: Params) =>
      updateQuizNotification({
        accessToken: session?.user.accessToken || '',
        quizNotificationEnabled: checked,
      }),
    onSuccess: async () => await update({}),
  })
}
