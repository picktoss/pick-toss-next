'use client'

import Icon from '@/shared/components/icon'
import Text from '@/shared/components/ui/text'
import { useRouter } from 'next/navigation'
import { NotificationProvider } from './context/notification-context'
import NotificationControlArea from './components/notification-control-area'

const Notification = () => {
  const router = useRouter()

  // 임시
  const isKakaoUser = true

  return (
    <>
      <header className="relative flex h-[54px] w-full items-center bg-background-base-01 px-[16px]">
        <button className="justify-self-start" onClick={() => router.back()}>
          <Icon name="arrow-left" className="size-[24px]" />
        </button>
        <Text typography="subtitle2-medium" className="center">
          알림 설정
        </Text>
      </header>

      <NotificationProvider>
        <NotificationControlArea isKakaoUser={isKakaoUser} />
      </NotificationProvider>
    </>
  )
}

export default Notification
