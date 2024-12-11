'use client'

import { getToken } from '@/firebase/messaging/get-token'
import { useServiceWorker } from '@/firebase/messaging/use-service-worker'
import { useEffect } from 'react'
import { usePostFcmToken } from '@/requests/fcm/hooks'
import { useSession } from 'next-auth/react'

export const useMessaging = () => {
  const { data: session } = useSession()
  useServiceWorker()
  const { mutate: postFcmTokenMutate } = usePostFcmToken()

  useEffect(() => {
    try {
      const requestFCMToken = async () => {
        const token = await getToken()

        if (token) {
          if (!session?.user.accessToken) return

          postFcmTokenMutate(token)
        }
      }

      void requestFCMToken()
    } catch (error) {
      console.error(error)
    }
  }, [postFcmTokenMutate, session?.user.accessToken])
}
