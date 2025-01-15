'use client'

import { onMessage } from '@firebase/messaging'
import { useEffect } from 'react'
import { initializeFirebaseMessaging } from '../../../firebase'

export const useServiceWorker = () => {
  useEffect(() => {
    let unsubscribe: (() => void) | undefined

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then(async (registration) => {
          try {
            const messaging = await initializeFirebaseMessaging()

            if (messaging) {
              unsubscribe = onMessage(messaging, async (payload) => {
                // 앱이 포그라운드 상태일 때만 알림 표시
                if (document.visibilityState === 'visible') {
                  if (Notification.permission === 'granted') {
                    await registration.showNotification(payload.notification?.title || '', {
                      body: payload.notification?.body,
                    })
                  }
                }
                // 백그라운드 상태일 때는 onBackgroundMessage가 처리하도록 함
              })
            }
          } catch (error) {
            console.error('Messaging 초기화 실패:', error)
          }
        })
        .catch((error) => {
          console.error('Service Worker 등록 실패:', error)
        })
    }

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])

  // useEffect(() => {
  //   if ('serviceWorker' in navigator) {
  //     navigator.serviceWorker.register('/firebase-messaging-sw.js').catch((error) => {
  //       console.error('Service Worker 등록 실패:', error)
  //     })
  //   } else {
  //     console.error('Service Worker가 이 환경에서 지원되지 않습니다.')
  //   }
  // }, [])
}
