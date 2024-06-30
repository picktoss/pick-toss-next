'use client'

import { useGetTodayQuizSetId } from '@/apis/fetchers/quiz/get-today-quiz-set-id/query'
import { CategoryProtector } from '@/components/category-protector'
import { SwitchCase } from '@/components/react/switch-case'
import { Button } from '@/components/ui/button'
import icons from '@/constants/icons'
import { cn } from '@/lib/utils'
import { calculateTimeUntilTomorrowMidnight, getCurrentDate } from '@/utils/date'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function QuizBanner() {
  const router = useRouter()

  const { data } = useGetTodayQuizSetId()
  const [remainingTime, setRemainingTime] = useState(calculateTimeUntilTomorrowMidnight())

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(calculateTimeUntilTomorrowMidnight())
    }, 30 * 1000)

    return () => clearInterval(timer)
  }, [])

  const type = data?.type ?? 'NOT_READY'
  const quizSetId = data?.quizSetId ?? null

  return (
    <div
      className={cn(
        'relative flex min-h-[240px] w-full flex-col justify-between rounded-[12px] p-[20px] lg:min-h-[248px] lg:max-w-[840px] text-body1-bold-eng',
        type === 'READY' && 'bg-orange-02',
        type === 'NOT_READY' && 'bg-gray-02',
        type === 'DONE' && 'bg-blue-02'
      )}
    >
      <div className="w-[calc(100%-160px)]">
        <div
          className={cn(
            'mb-[12px] text-body1-bold-eng',
            type === 'READY' && 'text-orange-06',
            type === 'NOT_READY' && 'text-gray-06',
            type === 'DONE' && 'text-blue-06'
          )}
        >
          TODAY&apos;s QUIZ
        </div>
        <div className="mb-[39px] flex flex-col gap-[8px]">
          <div className="text-h4-bold text-gray-09">
            <SwitchCase
              value={type}
              caseBy={{
                READY: <div>픽토스님을 위한 퀴즈가 준비되었어요</div>,
                NOT_READY: <div>아직 만들어진 퀴즈가 없어요</div>,
                DONE: <div>오늘의 퀴즈 완료!</div>,
              }}
            />
          </div>
          <div className="text-gray-08">
            <SwitchCase
              value={type}
              caseBy={{
                READY: (
                  <div className="text-body2-medium">
                    {getCurrentDate({ month: true, day: true, dayOfWeek: true })}
                  </div>
                ),
                NOT_READY: (
                  <div className="text-small1-regular">
                    퀴즈를 만들 수 있을 정도로 노트 양이 충분하지 않거나, 현재 퀴즈를 생성중입니다
                  </div>
                ),
                DONE: <div className="text-body2-medium">나의 점수: 80점</div>,
              }}
            />
          </div>
        </div>
      </div>

      <SwitchCase
        value={type}
        caseBy={{
          READY: (
            <Image src={icons.quizReady} width={148} className="absolute right-[18px]" alt="" />
          ),
          NOT_READY: (
            <Image src={icons.quizNotReady} width={148} className="absolute right-[18px]" alt="" />
          ),
          DONE: <Image src={icons.quizDone} width={148} className="absolute right-[18px]" alt="" />,
        }}
      />

      <SwitchCase
        value={type}
        caseBy={{
          READY: (
            <Button
              className="flex w-full gap-[8px] rounded-[32px]"
              onClick={() => router.push(`/quiz?quizSetId=${quizSetId}`)}
            >
              <div>오늘의 퀴즈 시작하기</div>
              <Image src={icons.arrowRight} width={20.25} height={13.5} alt="" />
            </Button>
          ),
          NOT_READY: (
            <CategoryProtector>
              <Button
                className="flex w-full gap-[8px] rounded-[32px]"
                onClick={() => router.push('/create')}
              >
                <div>노트 추가하러 가기</div>
                <Image src={icons.arrowRight} width={20.25} height={13.5} alt="" />
              </Button>
            </CategoryProtector>
          ),
          DONE: (
            <Button className="flex w-full cursor-default gap-[8px] rounded-[32px] bg-blue-03 text-blue-06 hover:bg-blue-03">
              <div>
                내일 퀴즈까지 {remainingTime.hours.toString().padStart(2, '0')}:
                {remainingTime.minutes.toString().padStart(2, '0')}분 남음
              </div>
            </Button>
          ),
        }}
      />
    </div>
  )
}
