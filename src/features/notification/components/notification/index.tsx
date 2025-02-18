'use client'

import { useSearchParams } from 'next/navigation'
// import { NotificationList } from '../../config/notification-list'
import NoNotification from '../no-notification'
import NotificationItem from '../notification-item'
import { useQuery } from '@tanstack/react-query'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { useMemo } from 'react'

const Notification = () => {
  const tab = useSearchParams().get('tab') ?? ''
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const activeTab = ['all', 'quiz', 'general'].includes(tab) ? tab : 'all'
  const { data } = useQuery(queries.notification.all())
  const notificationList = useMemo(() => data?.notifications || [], [data])

  // tab에 따라 서버에 데이터 요청
  // useQuery(() => {
  // }, [activeTab])

  return (
    <main className="flex h-[calc(100dvh-54px-48px)] w-full flex-col gap-[8px] overflow-y-auto px-[16px]">
      {notificationList.length === 0 ? (
        <NoNotification />
      ) : (
        <>
          {notificationList.map((notification, index) => (
            <NotificationItem
              key={notification.notificationKey}
              type={notification.notificationType}
              title={notification.title}
              content={notification.content}
              date={notification.receivedTime}
              isFirst={index === 0}
              isLast={index === notificationList.length - 1}
            />
          ))}
        </>
      )}
    </main>
  )
}

export default Notification
