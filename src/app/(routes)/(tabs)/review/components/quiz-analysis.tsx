'use client'

import { HistoryChart } from './ui/history-chart'
import { useEffect, useState } from 'react'
import Loading from '@/components/loading'
import { QuizAnalysisSummary } from './ui/quiz-analysis-summary'
import { QuizTypeChart } from './ui/quiz-type-chart'
import { currentMonth } from '@/utils/date'
import { Period } from './ui/period'
import { PeriodTypeSelector } from './ui/period-type-selector'
import { CategorySelect } from './ui/category-select'
import { useGetCategoriesQuery } from '@/apis/fetchers/category/get-categories/query'
import { useGetMonthQuizAnswerRateQuery } from '@/apis/fetchers/quiz/get-month-quiz-answer-rate/query'
import { useGetWeekQuizAnswerRateQuery } from '@/apis/fetchers/quiz/get-week-quiz-answer-rate/query'

interface Period {
  type: 'week' | 'month'
  value?: number
}

export function QuizAnalysis() {
  const [period, setPeriod] = useState<Period>({
    type: 'week',
  })
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)

  const { data: categories } = useGetCategoriesQuery()

  const { data: weekQuizAnswerRate } = useGetWeekQuizAnswerRateQuery({
    categoryId: selectedCategoryId!,
    options: {
      enabled: selectedCategoryId != null,
    },
  })

  const { data: monthQuizAnswerRate } = useGetMonthQuizAnswerRateQuery({
    categoryId: selectedCategoryId!,
    date: {
      year: 2024,
      month: currentMonth(),
    },
    options: {
      enabled: selectedCategoryId != null,
    },
  })

  useEffect(() => {
    if (categories == null || categories?.length === 0) return

    setSelectedCategoryId(categories[0].id || null)
  }, [categories])

  const isLoading = categories == null || weekQuizAnswerRate == null || monthQuizAnswerRate == null

  const rateData = period.type === 'week' ? weekQuizAnswerRate : monthQuizAnswerRate

  return (
    <section className="relative flex min-h-[833px] flex-1 flex-col rounded-none bg-white p-[20px] pb-[70px] lg:min-h-[726px] lg:max-w-[520px] lg:rounded-[12px] lg:pb-[20px]">
      <h2 className="text-h4-bold text-gray-09">퀴즈 분석</h2>

      {isLoading ? (
        <Loading size="small" center />
      ) : (
        <div className="mt-[27px] lg:mt-[16px]">
          <Period
            periodType={period.type}
            weekDates={rateData!.quizzes.map((value) => value.date)}
            month={period.value || currentMonth()}
          />
          <PeriodTypeSelector
            periodType={period.type}
            selectWeek={() => setPeriod({ type: 'week' })}
            selectMonth={() => setPeriod({ type: 'month', value: currentMonth() })}
          />

          <div className="mt-[24px] flex flex-col gap-[12px]">
            <CategorySelect
              selectedCategoryId={selectedCategoryId || categories[0].id}
              categories={categories}
              onValueChange={(categoryId: number) => setSelectedCategoryId(categoryId)}
            />

            <div className="flex flex-col gap-[16px]">
              <QuizAnalysisSummary
                elapsedTime={rateData!.elapsedTime}
                totalQuizCount={rateData!.totalQuizCount}
                correctAnswerCount={rateData!.totalQuizCount - rateData!.incorrectAnswerCount}
              />
              <QuizTypeChart
                oxRate={Math.round((rateData!.multipleQuizCount / rateData!.totalQuizCount) * 100)}
                multipleRate={Math.round(
                  (rateData!.mixUpQuizCount / rateData!.totalQuizCount) * 100
                )}
              />
              <HistoryChart quizzes={rateData!.quizzes} periodType={period.type} />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
