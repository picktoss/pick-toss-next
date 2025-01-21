'use client'

import { useServiceWorker } from '@/firebase/messaging/use-service-worker'
import { useEffect } from 'react'
import { initializeFirebaseMessaging } from '../../../firebase'
import { useSession } from 'next-auth/react'
import { usePostFcmToken } from '@/requests/fcm/hooks'
import { getFCMToken } from '@/firebase/messaging/get-token'
import { useIsPWA } from './use-pwa'
import { requestNotificationPermission } from '../utils/notification'

export const useMessaging = () => {
  const { data: session } = useSession()
  const { mutate: postFcmTokenMutate } = usePostFcmToken()
  const isPWA = useIsPWA()

  useServiceWorker()

  useEffect(() => {
    const setupMessaging = async () => {
      const isBrowser = typeof window !== 'undefined'
      const isGranted = Notification.permission === 'granted'

      alert('Notification.permission: ' + Notification.permission)

      if (Notification.permission === 'default') {
        try {
          await requestNotificationPermission()
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error)
          alert(error)
        }
      }

      // 브라우저 환경에서만 실행, 세션이 있을 때만, 알림 허용 상태일 때만 실행
      if (isBrowser && session?.user.accessToken && isGranted) {
        try {
          alert('browser & session & granted')
          const messaging = await initializeFirebaseMessaging()

          if (messaging) {
            // 토큰 발급
            const token = await getFCMToken()

            if (token && isPWA) {
              alert('get token & isPWA')
              // 서버로 fcm 토큰 전송
              postFcmTokenMutate(token)
            }
          }
        } catch (error) {
          alert(error)
          console.error('FCM setup error:', error)
        }
      }
    }

    void setupMessaging()
  }, [session?.user.accessToken, postFcmTokenMutate, isPWA])
}
