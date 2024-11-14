import NotificationItem from '@/features/notification/components/notification-item'
import NotificationTab from '@/features/notification/components/notification-tab'
import { NotificationList } from '@/features/notification/config/notification-list'

const NotificationPage = () => {
  return (
    <>
      <NotificationTab />

      <main className="flex h-[calc(100dvh-54px-48px)] w-full flex-col gap-[8px] overflow-y-auto px-[16px]">
        {NotificationList.map((notification, index) => (
          <NotificationItem
            key={notification.id}
            type={notification.type}
            title={notification.title}
            content={notification.content}
            date={notification.date}
            isFirst={index === 0}
            isLast={index === NotificationList.length - 1}
          />
        ))}
      </main>
    </>
  )
}

export default NotificationPage
