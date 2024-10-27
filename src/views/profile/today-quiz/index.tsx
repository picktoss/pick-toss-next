'use client'

import Icon from '@/shared/components/icon'
import Tag from '@/shared/components/ui/tag'
import Text from '@/shared/components/ui/text'
import { useRouter } from 'next/navigation'
import DayCheck from './components/day-check'

const TodayQuiz = () => {
  const router = useRouter()

  return (
    <>
      <header className="relative flex h-[54px] w-full items-center bg-background-base-01 px-[16px]">
        <button className="justify-self-start" onClick={() => router.back()}>
          <Icon name="arrow-left" className="size-[24px]" />
        </button>
        <Text typography="subtitle2-medium" className="center">
          오늘의 퀴즈 현황
        </Text>
      </header>

      <main className="h-[calc(100dvh-54px-88px)] w-full overflow-y-auto px-[16px]">
        <div className="flex-center mt-[63px] flex-col">
          <Icon name="today-quiz" className="ml-[12px] size-[100px]" />
          <div className="flex-center mt-[20.38px] flex-col gap-[12px]">
            <Text typography="title1" className="text-text-accent">
              연속 2일 완료
            </Text>
            <Text typography="text1-medium" className="text-center text-text-secondary">
              오늘의 퀴즈를 완료할 때마다 별 5개를 드리고, <br />
              5일 연속 완료하면 20개를 드려요
            </Text>
          </div>
        </div>

        <DayCheck />

        <button className="my-[20px] flex h-[56px] w-full items-center justify-between rounded-[12px] bg-background-container-03 px-[20px] py-[10px]">
          <div className="flex-center gap-[8px]">
            <Tag className="bg-fill-primary-blue">EVENT</Tag>
            <Text typography="text1-bold" className="text-text-info">
              친구 초대하고 무료로 별 받기
            </Text>
          </div>
          <Icon name="chevron-right" className="size-[16px] text-icon-tertiary" />
        </button>
      </main>
    </>
  )
}

export default TodayQuiz
