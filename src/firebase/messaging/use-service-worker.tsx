'use client'

import { onMessage } from '@firebase/messaging'
import { useEffect, useState } from 'react'
import { initializeFirebaseMessaging } from '../../../firebase'

export const useServiceWorker = () => {
  const [isUpdated, setIsUpdated] = useState(false)

  useEffect(() => {
    let unsubscribe: (() => void) | undefined

    const setRegister = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js')
        // eslint-disable-next-line no-console
        console.log('✅ ServiceWorker registration successful')

        // 서비스 워커 업데이트 감지 및 강제 적용
        if (registration) {
          registration.update().then(() => {
            console.log('🔄 ServiceWorker 업데이트 확인됨')
          })

          registration.onupdatefound = () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.onstatechange = () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('⚡ 새로운 ServiceWorker가 설치됨')
                  setIsUpdated(true) // 새로운 버전 감지
                }
              }
            }
          }
        }

        try {
          const messaging = await initializeFirebaseMessaging()

          if (messaging) {
            unsubscribe = onMessage(messaging, async (payload) => {
              // 앱이 포그라운드 상태일 때만 알림 표시
              if (document.visibilityState === 'visible') {
                // eslint-disable-next-line no-console
                console.log('📩 포그라운드 메시지 수신:', payload)

                if (Notification.permission === 'granted') {
                  await registration.showNotification(payload.notification?.title || '', {
                    body: payload.notification?.body,
                  })
                }
              } else {
                // 백그라운드 상태일 때는 onBackgroundMessage가 처리하도록 함
                // eslint-disable-next-line no-console
                console.log('📪 백그라운드 상태 메세지:', '서비스 워커에서 messaging 처리')
              }
            })
          }
        } catch (error) {
          console.error('🚨 Firebase Messaging 초기화 실패:', error)
        }
      } catch (error) {
        console.error('🚨 ServiceWorker 등록 실패:', error)
      }
    }

    if ('serviceWorker' in navigator) {
      void setRegister()
    }

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])

  // ✅ 새로운 버전 감지 시 자동 새로고침
  useEffect(() => {
    if (isUpdated) {
      console.log('🔄 새로운 버전이 감지됨 → 페이지 새로고침')
      window.location.reload()
    }
  }, [isUpdated])
}
