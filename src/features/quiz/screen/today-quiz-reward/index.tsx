'use client'

import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import DayCheck from '../../components/today-quiz-check/day-check'
import { Button } from '@/shared/components/ui/button'
import { useRouter } from 'next/navigation'

interface Props {
  currentConsecutiveDays: number
  todayCheckData: {
    day: number
    isComplete: boolean
  }[]
}

// TODO: 애니메이션 구현
const TodayQuizReward = ({ currentConsecutiveDays, todayCheckData }: Props) => {
  const router = useRouter()

  return (
    <div className="h-dvh w-dvw max-w-mobile overflow-y-auto bg-background-base-01 px-[16px] pb-[100px]">
      <div className="flex-center mt-[63px] flex-col">
        <Icon name="today-quiz" className="ml-[12px] size-[100px]" />
        <div className="flex-center mt-[20.38px] flex-col gap-[12px]">
          <Text typography="title1" className="text-text-accent">
            연속 {currentConsecutiveDays}일 완료
          </Text>
          <Text typography="text1-medium" className="text-center text-text-secondary">
            오늘의 퀴즈를 완료할 때마다 별 5개를 드리고, <br />
            5일 연속 완료하면 20개를 드려요
          </Text>
        </div>
      </div>

      <DayCheck checkData={todayCheckData} />

      {/* 메인 화면으로 이동하면서 토스트 띄우기 */}
      <Button onClick={() => router.replace('/main')} className="mt-[32px] w-full max-w-[220px]">
        별 5개 받기
      </Button>
    </div>
  )
}

export default TodayQuizReward
