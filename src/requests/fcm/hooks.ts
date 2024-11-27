'use client'

import { useMutation } from '@tanstack/react-query'
import { postFcmToken } from '.'

export const usePostFcmToken = () => {
  return useMutation({
    mutationFn: async (fcmToken: string) => postFcmToken({ fcmToken }),
    // eslint-disable-next-line no-console
    onSuccess: () => console.log('토큰 전송 성공'),
  })
}
