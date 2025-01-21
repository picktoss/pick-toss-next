'use client'

import { useEffect, useState } from 'react'
import { NotificationPermissionDialog, useMessaging } from '@/shared/hooks/use-messaging'
import { setPWAAppLaunched } from '@/shared/utils/pwa'
import { useSession } from 'next-auth/react'
import { useUserInfo } from '@/requests/user/hooks'
import { useIsPWA } from '@/shared/hooks/use-pwa'

/**
 * 클라이언트에서 실행되어야 하는 초기 작업(PWA, 메시징 등)을 처리합니다.
 */
const ClientSetUp = () => {
  const [renderPermissionDialog, setRenderPermissionDialog] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const { data: session } = useSession()
  const { mutate: getUserInfoMutate } = useUserInfo()
  const isPWA = useIsPWA()

  useMessaging()

  useEffect(() => {
    const IOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    setIsIOS(IOS)
  }, [])

  useEffect(() => {
    setPWAAppLaunched(isPWA)

    const needPermissionDialog = Notification.permission === 'default' && isPWA && isIOS

    if (session?.user) {
      getUserInfoMutate()

      if (needPermissionDialog) {
        setRenderPermissionDialog(true)
      }
    }
  }, [isPWA, session?.user, getUserInfoMutate, isIOS])

  if (renderPermissionDialog) {
    return <NotificationPermissionDialog /> // ios 알림 권한 요청을 위한 dialog
  }

  return null
}

export default ClientSetUp
