'use client'

import { fakeData } from '@/features/user/mock/fake-data'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import NoHistory from '../no-history'
import DateContainer from '../date-container'
import ListItem from '../list-item'
import { StarHistoryTab } from '../history-tab'

const StarHistory = () => {
  const tab = useSearchParams().get('tab') ?? ''
  const activeTab = ['all', 'payment', 'expend', 'reward'].includes(tab) ? tab : 'all'

  useEffect(() => {
    // tab에 따라 서버에 데이터 요청
  }, [activeTab])

  return (
    <main className="flex h-[calc(100dvh-54px-48px-88px)] w-full flex-col gap-[8px] overflow-y-auto px-[16px]">
      {fakeData.length === 0 ? (
        <NoHistory activeTab={activeTab as StarHistoryTab} />
      ) : (
        fakeData.map((dateItem, index) => (
          <DateContainer key={dateItem.date} date={dateItem.date} isFirst={index === 0}>
            {dateItem.list.map((listItem, index) => (
              <ListItem
                key={listItem.id}
                isLast={index === dateItem.list.length - 1}
                type={listItem.type}
                star={listItem.star}
                content={listItem.content}
                description={listItem.description}
                detail={listItem.detail}
              />
            ))}
          </DateContainer>
        ))
      )}
    </main>
  )
}

export default StarHistory
