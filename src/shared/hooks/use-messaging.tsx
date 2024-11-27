'use client'

import { getToken } from '@/firebase/messaging/get-token'
import { useServiceWorker } from '@/firebase/messaging/use-service-worker'
import { useEffect } from 'react'
import { http } from '../lib/axios/http'
import { API_ENDPOINTS } from '../configs/endpoint'
import { useSession } from 'next-auth/react'

export const useMessaging = () => {
  useServiceWorker()

  const { data: session } = useSession()

  useEffect(() => {
    try {
      const requestFCMToken = async () => {
        const token = await getToken()
        if (token) {
          // eslint-disable-next-line no-console
          console.log('FCM 토큰:', token) // 디버깅용

          // FCM 토큰을 서버로 전송
          await http.post(
            API_ENDPOINTS.FCM.POST.TOKEN,
            { fcmToken: token },
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
              },
            }
          )
        }
      }

      void requestFCMToken()
    } catch (error) {
      console.error(error)
    }
  }, [session])
}
