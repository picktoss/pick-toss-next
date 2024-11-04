import { NotificationProvider } from '@/features/notification/contexts/notification-context'
import NotificationControlArea from '@/features/notification/components/notification-control-area'

const NotificationPage = () => {
  const isKakaoUser = true

  return (
    <NotificationProvider>
      <NotificationControlArea isKakaoUser={isKakaoUser} />
    </NotificationProvider>
  )
}

export default NotificationPage
