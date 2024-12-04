'use client'

import { useEffect } from 'react'

export const useServiceWorker = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js').catch((error) => {
        console.error('Service Worker 등록 실패:', error)
      })
    } else {
      console.error('Service Worker가 이 환경에서 지원되지 않습니다.')
    }
  }, [])
}
