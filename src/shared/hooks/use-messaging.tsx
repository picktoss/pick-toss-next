'use client'

import { useServiceWorker } from '@/firebase/messaging/use-service-worker'
import { useEffect, useState } from 'react'
import { initializeFirebaseMessaging } from '../../../firebase'
import { useSession } from 'next-auth/react'
import { usePostFcmToken } from '@/requests/fcm/hooks'
import { getFCMToken } from '@/firebase/messaging/get-token'
import { useIsPWA } from './use-pwa'
import { Dialog, DialogContent } from '../components/ui/dialog'
import { Button } from '../components/ui/button'
import Icon from '../components/custom/icon'
import Text from '../components/ui/text'
// import { requestNotificationPermission } from '../utils/notification'

export const useMessaging = () => {
  const { data: session } = useSession()
  const { mutate: postFcmTokenMutate } = usePostFcmToken()
  const isPWA = useIsPWA()

  useServiceWorker()

  useEffect(() => {
    const isBrowser = typeof window !== 'undefined'
    const isGranted = Notification.permission === 'granted'
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

    const setupMessaging = async () => {
      alert(
        `초기 상태: Browser=${isBrowser}, PWA=${isPWA}, iOS=${isIOS}, Permission=${Notification.permission}`
      )

      // if (Notification.permission === 'default' && isPWA && !isIOS) {
      //   try {
      //     void requestNotificationPermission()
      //   } catch (error) {
      //     console.error(error)
      //   }
      // }

      // 브라우저 환경에서만 실행, 세션이 있을 때만, 알림 허용 상태일 때만 실행
      if (isBrowser && session?.user.accessToken && isGranted) {
        try {
          // alert('browser & session & granted')
          const messaging = await initializeFirebaseMessaging()

          if (messaging) {
            // 토큰 발급
            const token = await getFCMToken()

            if (token && isPWA) {
              // alert('fcm token: ' + token)

              // 서버로 fcm 토큰 전송
              postFcmTokenMutate(token)
            }
          }
        } catch (error) {
          // alert(error)
          console.error('FCM setup error:', error)
        }
      }
    }

    void setupMessaging()
  }, [session?.user.accessToken, postFcmTokenMutate, isPWA])
}

export const NotificationPermissionDialog = () => {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)
  const isPWA = useIsPWA()

  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

    if (session?.user.accessToken && isPWA && Notification.permission === 'default' && isIOS) {
      setOpen(true)
    }
  }, [session?.user.accessToken, isPWA])

  const handleClick = async () => {
    try {
      const registration = await navigator.serviceWorker.ready
      await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      })

      alert(`권한 요청 결과: ${Notification.permission}`)
      setOpen(false)
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      alert(`권한 요청 실패: ${error as any}`)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        displayCloseButton={false}
        className="flex-center size-fit flex-col rounded-[20px] bg-background-base-01 p-[24px]"
        onPointerDownOutside={(e) => {
          e.preventDefault()
        }}
      >
        <Icon name="today-quiz-and-blue-speech-bubble" className="mb-[24px] w-[212px]" />

        <div className="flex-center mb-[36px] flex-col gap-[8px]">
          <Text typography="title3" className="font-suit">
            푸시 알림 허용 안내
          </Text>

          <Text typography="text1-regular" color="sub" className="text-center">
            알림을 허용하시면 퀴즈 도착 확인 등 <br />더 편리한 서비스 이용이 가능해요
          </Text>
        </div>

        <Button
          onClick={handleClick}
          className="w-full min-w-[260px]"
          id="notification-permission-button"
        >
          설정하기
        </Button>
      </DialogContent>
    </Dialog>
  )
}
