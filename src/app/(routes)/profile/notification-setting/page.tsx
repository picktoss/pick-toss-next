import { NotificationProvider } from '@/features/notification/contexts/notification-context'
import NotificationControlArea from '@/features/notification/components/notification-control-area'

const NotificationSettingPage = () => {
  const isKakaoUser = true

  return (
    <NotificationProvider>
      <NotificationControlArea isKakaoUser={isKakaoUser} />
    </NotificationProvider>
  )
}

export default NotificationSettingPage
