'use client'

import { getToken } from '@/firebase/messaging/get-token'
import { useServiceWorker } from '@/firebase/messaging/use-service-worker'
import { useEffect } from 'react'

export const useMessaging = () => {
  useServiceWorker()

  useEffect(() => {
    try {
      const requestFCMToken = async () => {
        const token = await getToken()
        if (token) {
          // eslint-disable-next-line no-console
          console.log('FCM 토큰:', token) // 디버깅용
          // FCM 토큰을 서버로 전송
        }
      }

      void requestFCMToken()
    } catch (error) {
      console.error(error)
    }
  }, [])
}
