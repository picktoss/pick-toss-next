'use client'

import { useServiceWorker } from '@/firebase/messaging/use-service-worker'
import { useEffect, useRef } from 'react'
import { initializeFirebaseMessaging } from '../../../firebase'
import { useSession } from 'next-auth/react'
import { usePostFcmToken } from '@/requests/fcm/hooks'
import { getFCMToken } from '@/firebase/messaging/get-token'
import { useIsPWA } from './use-pwa'
import { Dialog, DialogContent } from '../components/ui/dialog'

export const useMessaging = () => {
  const { data: session } = useSession()
  const { mutate: postFcmTokenMutate } = usePostFcmToken()
  const isPWA = useIsPWA()

  useServiceWorker()

  useEffect(() => {
    const setupMessaging = async () => {
      const isBrowser = typeof window !== 'undefined'
      const isGranted = Notification.permission === 'granted'
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

      alert(
        `초기 상태: Browser=${isBrowser}, PWA=${isPWA}, iOS=${isIOS}, Permission=${Notification.permission}`
      )

      if (Notification.permission === 'default' && isPWA && isIOS) {
        try {
          alert('iOS PWA 환경 감지')
          // Service Worker 준비 상태 확인
          await navigator.serviceWorker.ready
          alert('Service Worker Ready')

          // // 숨겨진 버튼 찾아서 클릭
          // const button = document.getElementById('notification-permission-button')
          // if (button) {
          //   button.click()
          // }
        } catch (error) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          alert(`초기화 실패: ${error as any}`)
        }
      }

      // 브라우저 환경에서만 실행, 세션이 있을 때만, 알림 허용 상태일 때만 실행
      if (isBrowser && session?.user.accessToken && isGranted) {
        try {
          alert('browser & session & granted')
          const messaging = await initializeFirebaseMessaging()

          if (messaging) {
            // 토큰 발급
            const token = await getFCMToken()

            if (token && isPWA) {
              alert('get token & isPWA')
              // 서버로 fcm 토큰 전송
              postFcmTokenMutate(token)
            }
          }
        } catch (error) {
          alert(error)
          console.error('FCM setup error:', error)
        }
      }
    }

    void setupMessaging()
  }, [session?.user.accessToken, postFcmTokenMutate, isPWA])
}

export const NotificationPermissionButton = () => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = async () => {
    try {
      const registration = await navigator.serviceWorker.ready
      await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      })

      alert(`권한 요청 결과: ${Notification.permission}`)
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      alert(`권한 요청 실패: ${error as any}`)
    }
  }

  return (
    <Dialog>
      <DialogContent
        displayCloseButton={false}
        className="size-[280px] rounded-[16px] bg-background-base-01 p-[24px]"
        onPointerDownOutside={(e) => {
          e.preventDefault()
        }}
      >
        <button
          ref={buttonRef}
          onClick={handleClick}
          className="hidden" // 버튼을 숨김
          id="notification-permission-button"
        >
          알림 권한 설정하기
        </button>
      </DialogContent>
    </Dialog>
  )
}
