'use client'

import { useQuery } from '@tanstack/react-query'
import { HistoryChart } from './ui/history-chart'
import { useEffect, useState } from 'react'
import { getWeekQuizAnswerRate } from '@/apis/fetchers/quiz/get-week-quiz-answer-rate'
// import { getMonthQuizAnswerRate } from '@/apis/fetchers/quiz/get-month-quiz-answer-rate'
import { getCategories } from '@/apis/fetchers/category/get-categories'
import { useSession } from 'next-auth/react'
import Loading from '@/components/loading'
import { QuizAnalysisSummary } from './ui/quiz-analysis-summary'
import { QuizTypeChart } from './ui/quiz-type-chart'

export function QuizAnalysis() {
  const { data: session } = useSession()
  //   const [periodType, setPeriodType] = useState<'week' | 'month'>('week')
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      getCategories({
        accessToken: session?.user.accessToken || '',
      }).then((res) => res.categories),
  })

  const { data: weekQuizAnswerRate } = useQuery({
    queryKey: ['week-quiz-answer-rate', selectedCategoryId],
    queryFn: () =>
      getWeekQuizAnswerRate({
        accessToken: session?.user.accessToken || '',
        categoryId: selectedCategoryId!,
      }),
    enabled: selectedCategoryId != null,
  })

  useEffect(() => {
    if (categories == null || categories?.length === 0) return

    setSelectedCategoryId(categories[0].id || null)
  }, [categories])

  const isLoading = categories == null || weekQuizAnswerRate == null

  return (
    <section className="relative flex flex-1 flex-col rounded-none bg-white p-[20px] pb-[70px] lg:max-w-[520px] lg:rounded-[12px] lg:pb-[20px]">
      <h2 className="text-h4-bold text-gray-09">퀴즈 분석</h2>
      {isLoading ? (
        <Loading size="small" center />
      ) : (
        <div className="mt-[27px]">
          <div className="mb-[24px] text-center text-h4-bold text-gray-08">5월1일~8일</div>

          <div className="flex flex-col gap-[12px]">
            <div className="text-body1-bold text-gray-08">📚 전공 공부</div>

            <div className="flex flex-col gap-[16px]">
              <QuizAnalysisSummary
                elapsedTime={weekQuizAnswerRate.elapsedTime}
                totalQuizCount={weekQuizAnswerRate.totalQuizCount}
                correctAnswerCount={
                  weekQuizAnswerRate.totalQuizCount - weekQuizAnswerRate.incorrectAnswerCount
                }
              />
              <QuizTypeChart
                oxRate={Math.round(
                  (weekQuizAnswerRate.multipleQuizCount / weekQuizAnswerRate.totalQuizCount) * 100
                )}
                multipleRate={Math.round(
                  (weekQuizAnswerRate.mixUpQuizCount / weekQuizAnswerRate.totalQuizCount) * 100
                )}
              />
              <HistoryChart quizzes={weekQuizAnswerRate.quizzes} />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
