import Text from '@/shared/components/ui/text'
import { NotificationProvider } from '@/features/notification/contexts/notification-context'
import GoBackButton from '@/shared/components/custom/go-back-button'
import NotificationControlArea from '@/features/notification/notification-control-area'

const NotificationPage = () => {
  const isKakaoUser = true

  return (
    <>
      <header className="relative flex h-[54px] w-full items-center bg-background-base-01 px-[16px]">
        <GoBackButton />
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

export default NotificationPage
