'use client'

import { useEffect } from 'react'
import { useMessaging } from '@/shared/hooks/use-messaging'
import { isAppLaunched, setPWAAppLaunched } from '@/shared/utils/pwa'
import { useSession } from 'next-auth/react'
import { useUserInfo } from '@/requests/user/hooks'

/**
 * 클라이언트에서 실행되어야 하는 초기 작업(PWA, 메시징 등)을 처리합니다.
 * 렌더링은 하지 않습니다.
 */
const ClientSetUp = () => {
  const { data: session } = useSession()
  const { mutate: getUserInfoMutate } = useUserInfo()

  useMessaging()

  useEffect(() => {
    const launched = isAppLaunched()
    setPWAAppLaunched(launched)
  }, [])

  useEffect(() => {
    if (session?.user) {
      getUserInfoMutate()
    }
  }, [session])

  return null
}

export default ClientSetUp
