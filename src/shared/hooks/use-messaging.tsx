'use client'

import { useServiceWorker } from '@/firebase/messaging/use-service-worker'
import { useEffect } from 'react'
import { initializeFirebaseMessaging } from '../../../firebase'
import { useSession } from 'next-auth/react'
import { usePostFcmToken } from '@/requests/fcm/hooks'
import { getFCMToken } from '@/firebase/messaging/get-token'

export const useMessaging = () => {
  const { data: session } = useSession()
  const { mutate: postFcmTokenMutate } = usePostFcmToken()

  useServiceWorker()

  useEffect(() => {
    const setupMessaging = async () => {
      // 브라우저 환경에서만 실행, 세션이 있을 때만 실행
      if (typeof window !== 'undefined' && session?.user.accessToken) {
        try {
          const messaging = await initializeFirebaseMessaging()

          if (messaging) {
            // 토큰 가져오기
            const token = await getFCMToken()

            if (token) {
              postFcmTokenMutate(token)
            }
          }
        } catch (error) {
          console.error('FCM setup error:', error)
        }
      }
    }

    void setupMessaging()
  }, [session?.user.accessToken, postFcmTokenMutate])
}
