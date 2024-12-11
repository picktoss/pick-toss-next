'use client'

import { useEffect } from 'react'
import { isPwaInstalled } from '@/shared/utils/pwa'
import { useMessaging } from '@/shared/hooks/use-messaging'

/**
 * 클라이언트에서 실행되어야 하는 초기 작업(PWA, 메시징 등)을 처리합니다.
 * 렌더링은 하지 않습니다.
 */
const ClientSetUp = () => {
  useMessaging()

  useEffect(() => {
    const installed = isPwaInstalled()
    document.cookie = `pwaInstalled=${installed}; path=/`
  }, [])

  return null
}

export default ClientSetUp
