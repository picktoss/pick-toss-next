'use client'

import { Button } from '@/shared/components/ui/button'
import Text from '@/shared/components/ui/text'
import { formatDateKorean, getCurrentDate } from '@/shared/utils/date'
import QuizArrivedAnimation from '../quiz-arrived-animation'
import Link from 'next/link'

interface Props {
  quizSetId: string
  createdAt: string
}

const TodayQuizArrived = ({ quizSetId, createdAt }: Props) => {
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

      <Link href={'/quiz/' + quizSetId + '?quizType=today' + '&' + `createdAt=${createdAt}`}>
        <Button variant={'largeRound'} className="w-full">
          퀴즈 시작하기
        </Button>
      </Link>
    </div>
  )
}

export default TodayQuizArrived
