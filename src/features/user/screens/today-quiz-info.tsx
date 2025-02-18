'use client'

import InviteRewardDrawer from '@/features/payment/components/invite-reward-drawer'
import DayCheck from '@/features/quiz/components/today-quiz-check/day-check'
import { todayQuizCheckList } from '@/features/quiz/config'
import Icon from '@/shared/components/custom/icon'
import Tag from '@/shared/components/ui/tag'
import Text from '@/shared/components/ui/text'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

const TodayQuizInfo = () => {
  const { data } = useQuery(queries.quiz.todayQuizInfo())

  const todayCheckData = useMemo(
    () =>
      todayQuizCheckList.map((checkItem) => {
        const currentConsecutiveDays = data?.currentConsecutiveDays ?? 0

        // eslint-disable-next-line no-console
        console.log(currentConsecutiveDays)

        if (checkItem.day <= currentConsecutiveDays) {
          return { ...checkItem, isComplete: true }
        }
        return { ...checkItem }
      }),
    [data]
  )

  return (
    <main className="h-[calc(100dvh-54px-88px)] w-full overflow-y-auto px-[16px]">
      <div className="flex-center mt-[63px] flex-col">
        <Icon name="today-quiz" className="ml-[12px] size-[100px]" />
        <div className="flex-center mt-[20.38px] flex-col gap-[12px]">
          <Text typography="title1" className="text-text-accent">
            연속 {data?.currentConsecutiveDays}일 완료
          </Text>
          <Text typography="text1-medium" className="text-center text-text-secondary">
            오늘의 퀴즈를 완료할 때마다 별 5개를 드리고, <br />
            5일 연속 완료하면 20개를 드려요
          </Text>
        </div>
      </div>

      <DayCheck checkData={todayCheckData} />

      <InviteRewardDrawer
        triggerComponent={
          <button className="mt-[20px] flex h-[56px] w-full items-center justify-between rounded-[12px] bg-background-container-03 px-[20px] py-[10px]">
            <div className="flex-center gap-[8px]">
              <Tag className="bg-fill-primary-blue">EVENT</Tag>
              <Text typography="text1-bold" className="text-text-info">
                친구 초대하고 무료로 별 받기
              </Text>
            </div>
            <Icon name="chevron-right" className="size-[16px] text-icon-tertiary" />
          </button>
        }
      />
    </main>
  )
}

export default TodayQuizInfo
