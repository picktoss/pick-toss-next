'use client'

import { useEffect } from 'react'
import { useMessaging } from '@/shared/hooks/use-messaging'
import { setPWAAppLaunched } from '@/shared/utils/pwa'
import { useSession } from 'next-auth/react'
import { useUserInfo } from '@/requests/user/hooks'
import { useIsPWA } from '@/shared/hooks/use-pwa'

/**
 * 클라이언트에서 실행되어야 하는 초기 작업(PWA, 메시징 등)을 처리합니다.
 * 렌더링은 하지 않습니다.
 */
const ClientSetUp = () => {
  const { data: session } = useSession()
  const { mutate: getUserInfoMutate } = useUserInfo()
  const isPWA = useIsPWA()

  useMessaging()

  useEffect(() => {
    setPWAAppLaunched(isPWA)
  }, [isPWA])

  useEffect(() => {
    if (session?.user) {
      getUserInfoMutate()
    }
  }, [session?.user, getUserInfoMutate])

  return null
}

export default ClientSetUp
