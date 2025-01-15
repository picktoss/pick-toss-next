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
                payload.data = {
                  ...payload.data,
                  handledInForeground: 'true',
                }

                if (Notification.permission === 'granted') {
                  await registration.showNotification(payload.notification?.title || '', {
                    body: payload.notification?.body,
                  })
                }
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

    // cleanup 함수를 여기로 이동
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
