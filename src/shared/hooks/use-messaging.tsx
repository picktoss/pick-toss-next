'use client'

import { useServiceWorker } from '@/firebase/messaging/use-service-worker'
import { useEffect } from 'react'
import { initializeFirebaseMessaging } from '../../../firebase'
import { useSession } from 'next-auth/react'
import { usePostFcmToken } from '@/requests/fcm/hooks'
import { getFCMToken } from '@/firebase/messaging/get-token'
import { useIsPWA } from './use-pwa'

export const useMessaging = () => {
  const { data: session } = useSession()
  const { mutate: postFcmTokenMutate } = usePostFcmToken()
  const isPWA = useIsPWA()

  useServiceWorker()

  useEffect(() => {
    const setupMessaging = async () => {
      // 브라우저 환경에서만 실행, 세션이 있을 때만 실행
      if (typeof window !== 'undefined' && session?.user.accessToken) {
        try {
          // 알림 권한 요청
          const hasPermission = await checkAndRequestNotificationPermission()
          if (!hasPermission) return

          const messaging = await initializeFirebaseMessaging()

          if (messaging) {
            // 토큰 가져오기
            const token = await getFCMToken()

            if (token && isPWA) {
              postFcmTokenMutate(token)
            }
          }
        } catch (error) {
          console.error('FCM setup error:', error)
        }
      }
    }

    void setupMessaging()
  }, [session?.user.accessToken, postFcmTokenMutate, isPWA])
}

const checkAndRequestNotificationPermission = async () => {
  // 이미 권한이 허용된 경우
  if (Notification.permission === 'granted') {
    return true
  }

  // 이미 권한이 거부된 경우
  if (Notification.permission === 'denied') {
    // eslint-disable-next-line no-console
    console.log('알림 권한이 이미 거부되어 있습니다.')
    return false
  }

  // 권한이 아직 요청되지 않은 경우('default')에만 요청
  if (Notification.permission === 'default') {
    try {
      const permission = await Notification.requestPermission()
      return permission === 'granted'
    } catch (error) {
      console.error('알림 권한 요청 중 에러:', error)
      return false
    }
  }

  return false
}
