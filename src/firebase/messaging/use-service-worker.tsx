'use client'

import { onMessage } from '@firebase/messaging'
import { useEffect, useState } from 'react'
import { initializeFirebaseMessaging } from '../../../firebase'

export const useServiceWorker = () => {
  const [isUpdated, setIsUpdated] = useState(false)

  useEffect(() => {
    let unsubscribe: (() => void) | undefined
    let registration: ServiceWorkerRegistration | undefined

    const registerServiceWorker = async () => {
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js')
      // eslint-disable-next-line no-console
      console.log('✅ ServiceWorker registration successful')

      // 서비스 워커 업데이트 감지 및 강제 적용
      if (registration) {
        await registration.update().then(() => {
          // eslint-disable-next-line no-console
          console.log('🔄 ServiceWorker 업데이트 확인됨')
        })

        registration.onupdatefound = () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.onstatechange = () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // eslint-disable-next-line no-console
                console.log('⚡ 새로운 ServiceWorker가 설치됨')
                setIsUpdated(true) // 새로운 버전 감지
              }
            }
          }
        }

        return registration
      }
    }

    const setRegister = async () => {
      try {
        // iPad 감지
        const isIPad =
          /iPad/.test(navigator.userAgent) ||
          (/Macintosh/i.test(navigator.userAgent) && 'ontouchend' in document)

        // 이미 등록된 서비스 워커 확인
        const existingRegistration = await navigator.serviceWorker.getRegistration()
        if (existingRegistration) {
          registration = existingRegistration
        }

        if (!(isIPad && existingRegistration)) {
          registration = await registerServiceWorker()
        }

        try {
          const messaging = await initializeFirebaseMessaging()

          if (messaging) {
            unsubscribe = onMessage(messaging, async (payload) => {
              // 앱이 포그라운드 상태일 때만 알림 표시
              if (document.visibilityState === 'visible') {
                // eslint-disable-next-line no-console
                console.log('📩 포그라운드 메시지 수신:', payload)

                if (registration && Notification.permission === 'granted') {
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
      // iPad 감지
      const isIPad =
        /iPad/.test(navigator.userAgent) ||
        (/Macintosh/i.test(navigator.userAgent) && 'ontouchend' in document)

      // iPad의 경우 localStorage를 사용하여 무한 리로드 방지
      if (isIPad) {
        const lastUpdateTime = localStorage.getItem('lastSwUpdate')
        const currentTime = Date.now()

        // 마지막 업데이트로부터 10분 이상 지난 경우에만 리로드
        if (!lastUpdateTime || currentTime - parseInt(lastUpdateTime) > 600000) {
          localStorage.setItem('lastSwUpdate', currentTime.toString())
          // eslint-disable-next-line no-console
          console.log('🔄 iPad에서 제어된 새로고침 실행')
          window.location.reload()
        } else {
          // iPad에서 너무 빈번한 업데이트 방지
          setIsUpdated(false) // 업데이트 상태 초기화
        }
      } else {
        // eslint-disable-next-line no-console
        console.log('🔄 새로운 버전이 감지됨 → 페이지 새로고침')
        window.location.reload()
      }
    }
  }, [isUpdated])
}
