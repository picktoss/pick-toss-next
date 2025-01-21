'use client'

import { useEffect, useState } from 'react'
import { NotificationPermissionButton, useMessaging } from '@/shared/hooks/use-messaging'
import { setPWAAppLaunched } from '@/shared/utils/pwa'
import { useSession } from 'next-auth/react'
import { useUserInfo } from '@/requests/user/hooks'
import { useIsPWA } from '@/shared/hooks/use-pwa'

/**
 * 클라이언트에서 실행되어야 하는 초기 작업(PWA, 메시징 등)을 처리합니다.
 * 렌더링은 하지 않습니다.
 */
const ClientSetUp = () => {
  const [renderPermissionDialog, setRenderPermissionDialog] = useState(false)
  const { data: session } = useSession()
  const { mutate: getUserInfoMutate } = useUserInfo()
  const isPWA = useIsPWA()
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

  useMessaging()

  useEffect(() => {
    setPWAAppLaunched(isPWA)

    if (session?.user && Notification.permission === 'default' && isPWA && isIOS) {
      setRenderPermissionDialog(true)
    }
  }, [isPWA, session?.user, isIOS])

  useEffect(() => {
    if (session?.user) {
      getUserInfoMutate()
    }
  }, [session?.user, getUserInfoMutate])

  if (renderPermissionDialog) {
    return <NotificationPermissionButton />
  }

  return null
}

export default ClientSetUp
