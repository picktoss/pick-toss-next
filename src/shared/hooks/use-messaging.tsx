'use client'

// import { useServiceWorker } from '@/firebase/messaging/use-service-worker'
import { useEffect } from 'react'
import { initializeFirebaseMessaging } from '../../../firebase'
import { useSession } from 'next-auth/react'
import { usePostFcmToken } from '@/requests/fcm/hooks'
import { getFCMToken } from '@/firebase/messaging/get-token'
import { isAppLaunched } from '../utils/pwa'
import { onMessage } from '@firebase/messaging'

export const useMessaging = () => {
  const { data: session } = useSession()
  const { mutate: postFcmTokenMutate } = usePostFcmToken()

  // useServiceWorker()

  useEffect(() => {
    const setupMessaging = async () => {
      // 브라우저 환경에서만 실행, 세션이 있을 때만 실행
      if (typeof window !== 'undefined' && session?.user.accessToken) {
        try {
          const messaging = await initializeFirebaseMessaging()

          if (messaging) {
            // 토큰 가져오기
            const token = await getFCMToken()

            if (token && isAppLaunched()) {
              postFcmTokenMutate(token)
            }

            // eslint-disable-next-line no-console
            console.log(token)

            // 포그라운드 상태에서만 메시지 처리
            onMessage(messaging, (payload) => {
              // eslint-disable-next-line no-console
              console.log('포그라운드 메시지 수신:', payload)

              if (document.visibilityState === 'visible') {
                const { title, body } = payload.notification || {}

                // Notification API로 알림 표시
                if (Notification.permission === 'granted') {
                  new Notification(title || '기본 제목', {
                    body: body || '기본 내용',
                    // icon: '/default-icon.png', // 필요시, 아이콘 경로 설정
                  })
                } else {
                  // eslint-disable-next-line no-console
                  console.warn('알림 권한이 없습니다.')
                }
              }
            })
          }
        } catch (error) {
          console.error('FCM setup error:', error)
        }
      }
    }

    void setupMessaging()
  }, [session?.user.accessToken, postFcmTokenMutate])
}
