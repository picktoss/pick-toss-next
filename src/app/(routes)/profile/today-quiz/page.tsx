import DayCheck from '@/features/quiz/components/today-quiz-check/day-check'
import InviteReward from '@/features/payment/components/invite-reward'
import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { getTodayQuizInfo } from '@/requests/quiz/server'
import { todayQuizCheckList } from '@/features/quiz/config'

const TodayQuizPage = async () => {
  const { currentConsecutiveDays } = await getTodayQuizInfo()

  const todayCheckData = todayQuizCheckList.map((checkItem) => {
    if (checkItem.day <= currentConsecutiveDays) {
      return { ...checkItem, isComplete: true }
    }
    return { ...checkItem }
  })

  return (
    <main className="h-[calc(100dvh-54px-88px)] w-full overflow-y-auto px-[16px]">
      <div className="flex-center mt-[63px] flex-col">
        <Icon name="today-quiz" className="ml-[12px] size-[100px]" />
        <div className="flex-center mt-[20.38px] flex-col gap-[12px]">
          <Text typography="title1" className="text-text-accent">
            연속 {currentConsecutiveDays || 0}일 완료
          </Text>
          <Text typography="text1-medium" className="text-center text-text-secondary">
            오늘의 퀴즈를 완료할 때마다 별 5개를 드리고, <br />
            5일 연속 완료하면 20개를 드려요
          </Text>
        </div>
      </div>

      <DayCheck checkData={todayCheckData} />

      <InviteReward className="mt-[20px]" />
    </main>
  )
}

export default TodayQuizPage
