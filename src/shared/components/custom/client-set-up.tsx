'use client'

import { useEffect } from 'react'
import { setPWAAppLaunched } from '@/shared/utils/pwa'
import { useSession } from 'next-auth/react'
import { useUserInfo } from '@/requests/user/hooks'
import { useIsPWA } from '@/shared/hooks/use-pwa'
import { useMessaging } from '@/shared/hooks/use-messaging'
import NotificationPermissionDialog from '@/features/notification/components/notification-permission-dialog'
import { useServiceWorkerManager } from '@/shared/hooks/use-service-worker-manager'

/**
 * 클라이언트에서 실행되어야 하는 초기 작업(PWA, 메시징 등)을 처리합니다.
 */
const ClientSetUp = () => {
  const { data: session } = useSession()
  const { mutate: getUserInfoMutate } = useUserInfo()
  const isPWA = useIsPWA()

  const { isReadyNotification } = useMessaging()
  const { isInitialized, isIPadOS18 } = useServiceWorkerManager({ isPWA })

  // 알림 준비 상태 및 서비스 워커 초기화 로깅
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('알림 준비: ' + isReadyNotification)

    if (isInitialized) {
      // eslint-disable-next-line no-console
      console.log('서비스 워커 초기화 완료, iPadOS 18 감지:', isIPadOS18)
    }
  }, [isReadyNotification, isInitialized, isIPadOS18])

  useEffect(() => {
    setPWAAppLaunched(isPWA)
  }, [isPWA])

  useEffect(() => {
    if (session?.user) {
      getUserInfoMutate()
    }
  }, [session?.user, getUserInfoMutate])

  return <NotificationPermissionDialog /> // ios 알림 권한 요청을 위한 dialog
}

export default ClientSetUp
