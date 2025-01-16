'use client'

import { useMutation } from '@tanstack/react-query'
import { postFcmToken } from './client'
import { useSession } from 'next-auth/react'

export const usePostFcmToken = () => {
  const { data: session } = useSession()

  return useMutation({
    mutationFn: async (fcmToken: string) =>
      await postFcmToken(session?.user.accessToken, { fcmToken }),
    // eslint-disable-next-line no-console
    onSuccess: () => console.log('토큰 전송 성공'),
  })
}
