import { NotificationProvider } from '@/features/notification/contexts/notification-context'
import NotificationControlArea from '@/features/notification/components/notification-control-area'

const NotificationSettingPage = () => {
  return (
    <NotificationProvider>
      <NotificationControlArea />
    </NotificationProvider>
  )
}

export default NotificationSettingPage
