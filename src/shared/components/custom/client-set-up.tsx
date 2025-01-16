'use client'

import { useEffect, useRef } from 'react'
import { useMessaging } from '@/shared/hooks/use-messaging'
import { setPWAAppLaunched } from '@/shared/utils/pwa'
import { useSession } from 'next-auth/react'
import { useUserInfo } from '@/requests/user/hooks'
import { useIsPWA } from '@/shared/hooks/use-pwa'
import { requestNotificationPermission } from '@/shared/utils/notification'

/**
 * 클라이언트에서 실행되어야 하는 초기 작업(PWA, 메시징 등)을 처리합니다.
 * 렌더링은 하지 않습니다.
 */
const ClientSetUp = () => {
  const hiddenButtonRef = useRef<HTMLButtonElement>(null)
  const { data: session } = useSession()
  const { mutate: getUserInfoMutate } = useUserInfo()
  const isPWA = useIsPWA()

  useMessaging()

  useEffect(() => {
    // 화면 마운트 후 버튼 클릭
    if (hiddenButtonRef.current) {
      hiddenButtonRef.current.click()
    }
  }, [])

  useEffect(() => {
    setPWAAppLaunched(isPWA)
  }, [isPWA])

  useEffect(() => {
    if (session?.user) {
      getUserInfoMutate()
    }
  }, [session?.user, getUserInfoMutate])

  return (
    // ios상 알림 권한 허용 요청을 위한 보이지 않는 버튼
    <button
      ref={hiddenButtonRef}
      style={{
        display: 'none',
      }}
      onClick={requestNotificationPermission}
    >
      Invisible Notification Button
    </button>
  )
}

export default ClientSetUp
