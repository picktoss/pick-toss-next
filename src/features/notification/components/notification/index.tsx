'use client'

import { useSearchParams } from 'next/navigation'
import { NotificationList } from '../../config/notification-list'
import NoNotification from '../no-notification'
import NotificationItem from '../notification-item'
// import { useQuery } from '@tanstack/react-query'

const Notification = () => {
  const tab = useSearchParams().get('tab') ?? ''
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const activeTab = ['all', 'payment', 'expend', 'reward'].includes(tab) ? tab : 'all'

  // tab에 따라 서버에 데이터 요청
  // useQuery(() => {
  // }, [activeTab])

  return (
    <main className="flex h-[calc(100dvh-54px-48px)] w-full flex-col gap-[8px] overflow-y-auto px-[16px]">
      {NotificationList.length === 0 ? (
        <NoNotification />
      ) : (
        <>
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
        </>
      )}
    </main>
  )
}

export default Notification
