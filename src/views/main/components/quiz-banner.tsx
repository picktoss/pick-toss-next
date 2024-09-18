'use client'

import { TodayQuizSetType } from '@/actions/fetchers/quiz/get-today-quiz-set-id'
import { useGetWeekQuizAnswerRateMutation } from '@/actions/fetchers/quiz/get-week-quiz-answer-rate/mutation'
import { LOCAL_KEY } from '@/constants/local-key'
import Loading from '@/shared/components/loading'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { cn } from '@/shared/lib/utils'
import { calculateTimeUntilTomorrowMidnight } from '@/shared/utils/date'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { BannerBottomContent, BannerImage, BannerTopContent } from './quiz-banner-contents'
import { removeLocalStorage } from '@/shared/utils/storage'

// QuizBanner 컴포넌트
const QuizBanner = () => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const { data } = useQuery(queries.quiz.today())
  const [remainingTime, setRemainingTime] = useState(() => calculateTimeUntilTomorrowMidnight())
  const [type, setType] = useState<TodayQuizSetType | 'CREATING' | null>(null)
  const [resultScore, setResultScore] = useState<number | null>(null)

  const quizSetId = data?.quizSetId ?? null

  const { mutate: getWeekQuizAnswerRate } = useGetWeekQuizAnswerRateMutation()

  useEffect(() => {
    if (type !== 'DONE') {
      return
    }

    getWeekQuizAnswerRate(
      { categoryId: 0 },
      {
        onSuccess: (data) => {
          const todayData = data.quizzes[data.quizzes.length - 1]
          const score = Math.round(
            ((todayData.totalQuizCount - todayData.incorrectAnswerCount) /
              todayData.totalQuizCount) *
              100
          )
          setResultScore(score)
        },
      }
    )
  }, [type])

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(calculateTimeUntilTomorrowMidnight())
    }, 30 * 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!data?.type) {
      return
    }

    const creatingQuizLocalValue = localStorage.getItem(LOCAL_KEY.QUIZ_CREATING)
    const isQuizCreating = creatingQuizLocalValue || 'false'

    let intervalId: ReturnType<typeof setInterval>

    if (isQuizCreating === 'true') {
      setType('CREATING')
      intervalId = setInterval(async () => {
        await queryClient.refetchQueries({
          queryKey: queries.quiz.today().queryKey,
        })

        if (data.type === 'READY') {
          removeLocalStorage(LOCAL_KEY.QUIZ_CREATING)
          clearInterval(intervalId)
          setType(data.type)
        }
      }, 5000)
    } else {
      setType(data.type)
    }

    return () => clearInterval(intervalId)
  }, [data?.type, queryClient])

  if (type == null) {
    return (
      <div className="relative h-[240px] w-full rounded-[12px] bg-gray-01 lg:h-[248px] lg:max-w-[840px]">
        <Loading center />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'relative flex h-[240px] w-full flex-col justify-between rounded-[12px] p-[20px] lg:h-[248px] lg:max-w-[840px] text-body1-bold-eng lg:pl-[40px] lg:pt-[30px] lg:pb-[28px] overflow-hidden',
        type === 'READY' && 'bg-orange-02',
        type === 'NOT_READY' && 'bg-gray-02 h-[280px]',
        type === 'DONE' && 'bg-blue-02',
        type === 'CREATING' && 'bg-blue-02'
      )}
    >
      <div className="w-[calc(100%-160px)] text-nowrap">
        <div
          className={cn(
            'mb-[12px] text-body1-bold-eng',
            type === 'READY' && 'text-orange-06',
            type === 'NOT_READY' && 'text-gray-06',
            type === 'DONE' && 'text-blue-06',
            type === 'CREATING' && 'text-blue-06'
          )}
        >
          TODAY&apos;s QUIZ
        </div>
        <div className="mb-[39px] flex flex-col gap-[8px]">
          <BannerTopContent type={type} session={session} resultScore={resultScore} />
        </div>
      </div>

      <BannerImage type={type} />

      <BannerBottomContent type={type} quizSetId={quizSetId} remainingTime={remainingTime} />
    </div>
  )
}

export default QuizBanner
