import Text from '@/shared/components/ui/text'
import { NotificationProvider } from './context/notification-context'
import NotificationControlArea from './components/notification-control-area'
import GoBackButton from '@/shared/components/go-back-button'

const Notification = () => {
  // 임시
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

export default Notification
