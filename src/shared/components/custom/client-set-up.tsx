'use client'

import { useEffect } from 'react'
import { useMessaging } from '@/shared/hooks/use-messaging'
import { isAppLaunched, setPWAAppLaunched } from '@/shared/utils/pwa'

/**
 * 클라이언트에서 실행되어야 하는 초기 작업(PWA, 메시징 등)을 처리합니다.
 * 렌더링은 하지 않습니다.
 */
const ClientSetUp = () => {
  useMessaging()

  useEffect(() => {
    const launched = isAppLaunched()
    setPWAAppLaunched(launched)
  }, [])

  return null
}

export default ClientSetUp
