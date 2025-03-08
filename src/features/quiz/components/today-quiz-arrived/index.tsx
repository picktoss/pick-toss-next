'use client'

import { Button } from '@/shared/components/ui/button'
import Text from '@/shared/components/ui/text'
import { formatDateKorean } from '@/shared/utils/date'
import QuizArrivedAnimation from '../quiz-arrived-animation'
import Link from 'next/link'
import { useAmplitudeContext } from '@/shared/hooks/use-amplitude-context'

interface Props {
  quizSetId: string
  createdAt: string
}

const TodayQuizArrived = ({ quizSetId, createdAt }: Props) => {
  const { quizStartClickEvent: quizStartEvent } = useAmplitudeContext()
  const MonthDateDay = formatDateKorean(createdAt, { month: true, day: true, dayOfWeek: true })

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

      <Link
        href={'/quiz/' + quizSetId + '?quizSetType=TODAY_QUIZ_SET' + '&' + `createdAt=${createdAt}`}
      >
        <Button
          variant={'largeRound'}
          className="w-full"
          onClick={() => {
            quizStartEvent({
              type: '오늘의 퀴즈',
              time: new Date().getHours(),
            })
          }}
        >
          퀴즈 시작하기
        </Button>
      </Link>
    </div>
  )
}

export default TodayQuizArrived
