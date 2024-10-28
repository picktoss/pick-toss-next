'use client'

import { Button } from '@/shared/components/ui/button'
import Text from '@/shared/components/ui/text'
import DateContainer from './components/date-container'
import ListItem from './components/list-item'
import { useState } from 'react'
import { fakeData } from './mock/fake-data'
import NoHistory from './components/no-history'
import GoBackButton from '@/shared/components/go-back-button'

type Tab = 'all' | 'payment' | 'expend' | 'reward'
// const fakeData = []

const StarHistory = () => {
  const [tab, setTab] = useState<Tab>('all')

  return (
    <>
      <header className="relative flex h-[54px] w-full items-center bg-background-base-01 px-[16px]">
        <GoBackButton />
        <Text typography="subtitle2-medium" className="center">
          별 내역
        </Text>
      </header>

      <div
        onClick={(e) => {
          const eventTarget = e.target as HTMLElement
          setTab(eventTarget.id as Tab)
        }}
        className="flex items-center gap-[8px] px-[16px] py-[8px]"
      >
        <Button
          id="all"
          variant={'smallRound'}
          colors={tab === 'all' ? 'selected' : 'outlined'}
          className="py-[7.5px]"
        >
          전체
        </Button>
        <Button
          id="payment"
          variant={'smallRound'}
          colors={tab === 'payment' ? 'selected' : 'outlined'}
          className="py-[7.5px]"
        >
          결제
        </Button>
        <Button
          id="expend"
          variant={'smallRound'}
          colors={tab === 'expend' ? 'selected' : 'outlined'}
          className="py-[7.5px]"
        >
          사용
        </Button>
        <Button
          id="reward"
          variant={'smallRound'}
          colors={tab === 'reward' ? 'selected' : 'outlined'}
          className="py-[7.5px]"
        >
          적립
        </Button>
      </div>

      <main className="flex h-[calc(100dvh-54px-48px-88px)] w-full flex-col gap-[8px] overflow-y-auto px-[16px]">
        {fakeData.length === 0 ? (
          <NoHistory tab={tab} />
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
    </>
  )
}

export default StarHistory
