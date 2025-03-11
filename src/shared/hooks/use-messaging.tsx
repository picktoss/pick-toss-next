'use client'

import { useServiceWorker } from '@/firebase/messaging/use-service-worker'
import { useEffect, useState } from 'react'
import { initializeFirebaseMessaging } from '../../../firebase'
import { useSession } from 'next-auth/react'
import { usePostFcmToken } from '@/requests/fcm/hooks'
import { getFCMToken } from '@/firebase/messaging/get-token'
import { useIsPWA } from './use-pwa'
import { requestNotificationPermission } from '../utils/notification'
import { isIOS } from 'react-device-detect'

export const useMessaging = () => {
  const { data: session } = useSession()
  const { mutate: postFcmTokenMutate } = usePostFcmToken()
  const isPWA = useIsPWA()
  const [isReadyNotification, setIsReadyNotification] = useState(false)

  useServiceWorker()

  useEffect(() => {
    const setupMessaging = async () => {
      try {
        const isBrowser = typeof window !== 'undefined'
        const isGranted = Notification.permission === 'granted'

        if (!isBrowser) return

        // 안드로이드 알림 권한 요청
        if (Notification.permission === 'default' && isPWA && !isIOS) {
          try {
            await requestNotificationPermission()
          } catch (error) {
            console.error('Notification permission request failed:', error)
            return
          } finally {
            window.location.reload()
          }
        }

        // 유저 세션 정보가 있고, 알림 허용 상태일 때만 진행
        if (!session?.user.accessToken || !isGranted) {
          return
        }

        const messaging = await initializeFirebaseMessaging()

        if (!messaging) {
          console.error('Failed to initialize Firebase messaging')
          return
        }

        // Get and process FCM token
        if (isPWA) {
          const token = await getFCMToken()
          if (token) {
            postFcmTokenMutate(token)
          }
        }

        setIsReadyNotification(true)
      } catch (error) {
        console.error('Messaging setup failed:', error)
      }
    }

    void setupMessaging()
  }, [session?.user.accessToken, postFcmTokenMutate, isPWA])

  return { isReadyNotification }
}
