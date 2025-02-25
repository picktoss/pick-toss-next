'use client'

import Icon from '@/shared/components/custom/icon'
import { Button } from '@/shared/components/ui/button'
import { Dialog, DialogContent } from '@/shared/components/ui/dialog'
import Text from '@/shared/components/ui/text'
import { useIsPWA } from '@/shared/hooks/use-pwa'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

const NotificationPermissionDialog = () => {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)
  const isPWA = useIsPWA()

  useEffect(() => {
    const checkNotificationPermission = async () => {
      if (typeof window === 'undefined') return
      if (!session?.user.accessToken || !isPWA) return

      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

      // iOS에서는 시스템에서 알림을 차단해도 'default'로 나올 수 있으므로 추가 검사 필요
      if (Notification.permission === 'default' && isIOS) {
        try {
          const result = await navigator.permissions.query({ name: 'notifications' })

          if (result.state === 'denied') {
            return // 시스템 차단된 경우 Dialog 안 띄움
          }

          setOpen(true) // 정상 default인 경우 Dialog 열기
        } catch (error) {
          console.error('🚨 권한 조회 실패:', error)
        }
      }
    }

    void checkNotificationPermission()
  }, [session?.user.accessToken, isPWA])

  const handleClick = async () => {
    try {
      const registration = await navigator.serviceWorker.ready
      await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      })
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.error(`권한 요청 실패: ${error as any}`)
    } finally {
      setOpen(false)
      window.location.reload()
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

export default NotificationPermissionDialog
