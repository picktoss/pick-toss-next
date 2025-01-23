import { NotificationProvider } from '@/features/notification/contexts/notification-context'
import NotificationControlArea from '@/features/notification/components/notification-control-area'
import { getUserInfo } from '@/requests/user/server'

const NotificationSettingPage = async () => {
  const user = await getUserInfo()

  return (
    <NotificationProvider user={user}>
      <NotificationControlArea />
    </NotificationProvider>
  )
}

export default NotificationSettingPage
