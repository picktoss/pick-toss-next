import { Button } from '@/shared/components/ui/button'
import Text from '@/shared/components/ui/text'
import { getCurrentDate } from '@/shared/utils/date'
import QuizArrivedAnimation from '../quiz-arrived-animation'

const TodayQuizArrived = () => {
  const MonthDateDay = getCurrentDate().split('년 ')[1]

  return (
    <div className="relative mt-[12px] flex h-fit w-full flex-col overflow-hidden rounded-[20px] bg-[var(--color-orange-200)] p-[16px] pt-[20px]">
      <QuizArrivedAnimation />

      <div className="z-10 mb-[40px] flex flex-col pl-[10px]">
        <Text typography="subtitle2-bold" color="accent" className="mb-[10px]">
          TODAY’s QUIZ
        </Text>
        <Text typography="title2" className="mb-[8px]">
          오늘의 퀴즈 도착!
        </Text>
        <Text typography="text1-medium" color="secondary">
          {MonthDateDay}
        </Text>
      </div>

      <Button variant={'largeRound'} className="w-full">
        퀴즈 시작하기
      </Button>
    </div>
  )
}

export default TodayQuizArrived
