'use client'

import { useEffect, useState } from 'react'

interface ServiceWorkerManagerOptions {
  isPWA: boolean
}

export const useServiceWorkerManager = ({ isPWA }: ServiceWorkerManagerOptions) => {
  const [isInitialized, setIsInitialized] = useState(false)
  const [isIPadOS18, setIsIPadOS18] = useState(false)

  // 서비스 워커 초기화 관리
  useEffect(() => {
    // 앱이 처음 로드될 때만 실행
    if (!isInitialized && typeof window !== 'undefined') {
      // 초기 렌더링이 완료된 후 서비스 워커 관련 작업 처리
      requestAnimationFrame(() => {
        setTimeout(async () => {
          try {
            // iPad 감지
            const isIPad =
              /iPad/.test(navigator.userAgent) ||
              (/Macintosh/i.test(navigator.userAgent) && 'ontouchend' in document)

            // iPadOS 버전 감지
            const isIPadOS18Check = isIPad && /Version\/18/.test(navigator.userAgent)
            setIsIPadOS18(isIPadOS18Check)

            if (isIPadOS18Check) {
              // iPadOS 18에서는 서비스 워커 충돌 방지를 위한 처리
              const registrations = await navigator.serviceWorker.getRegistrations()

              // 푸시 관련 서비스 워커를 제외한 불필요한 서비스 워커만 정리
              for (const registration of registrations) {
                if (registration.scope && !registration.scope.includes('firebase-messaging')) {
                  // 서비스 워커가 푸시 알림과 관련 없는 경우만 업데이트 확인
                  await registration.update()
                }
              }
            }

            setIsInitialized(true)
          } catch (error) {
            console.error('서비스 워커 초기화 오류:', error)
            setIsInitialized(true) // 오류가 발생해도 초기화 완료로 처리
          }
        }, 500) // 초기 렌더링 후 500ms 지연
      })
    }
  }, [isInitialized, isIPadOS18])

  // beforeunload 이벤트 처리
  useEffect(() => {
    const handleBeforeUnload = async () => {
      // PWA 모드가 아닐 때만 서비스 워커 해제 처리
      if (!isPWA) {
        try {
          const registrations = await navigator.serviceWorker.getRegistrations()
          // 중요: 푸시 알림 관련 서비스 워커는 유지
          for (const registration of registrations) {
            // firebase-messaging 관련 서비스 워커는 유지
            if (registration.scope && !registration.scope.includes('firebase-messaging')) {
              await registration.unregister()
            }
          }
        } catch (error) {
          console.error('서비스 워커 해제 오류:', error)
        }
      }
      // PWA 모드일 때는 서비스 워커를 유지하여 오프라인 기능 보존
    }

    // 개발 모드에서만 beforeunload 이벤트 처리
    if (process.env.NODE_ENV === 'development') {
      window.addEventListener('beforeunload', handleBeforeUnload)
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload)
      }
    }

    return undefined
  }, [isPWA])

  return {
    isInitialized,
    isIPadOS18,
  }
}
