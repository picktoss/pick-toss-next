'use client'

import { onMessage } from '@firebase/messaging'
import { useEffect } from 'react'
import { initializeFirebaseMessaging } from '../../../firebase'

export const useServiceWorker = () => {
  useEffect(() => {
    // let unsubscribe: (() => void) | undefined

    const setRegister = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js')
        // eslint-disable-next-line no-console
        console.log('ServiceWorker registration successful')

        try {
          const messaging = await initializeFirebaseMessaging()

          if (messaging) {
            onMessage(messaging, async (payload) => {
              // 앱이 포그라운드 상태일 때만 알림 표시
              if (document.visibilityState === 'visible') {
                // eslint-disable-next-line no-console
                console.log('포그라운드 메시지 수신:', payload)

                if (Notification.permission === 'granted') {
                  await registration.showNotification(payload.notification?.title || '', {
                    body: payload.notification?.body,
                  })
                }
              } else {
                // 백그라운드 상태일 때는 onBackgroundMessage가 처리하도록 함
                // eslint-disable-next-line no-console
                console.log('백그라운드 상태 메세지:', '서비스 워커에서 messaging 처리')
              }
            })
          }
        } catch (error) {
          console.error('Messaging 초기화 실패:', error)
        }
      } catch (error) {
        console.error('ServiceWorker registration failed:', error)
      }
    }

    if ('serviceWorker' in navigator) {
      void setRegister()
    }

    // return () => {
    //   if (unsubscribe) {
    //     unsubscribe()
    //   }
    // }
  }, [])
}
