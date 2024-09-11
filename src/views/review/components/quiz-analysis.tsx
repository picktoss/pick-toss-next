'use client'

import { HistoryChart } from './history-chart'
import { useState } from 'react'
import Loading from '@/shared/components/loading'
import { QuizAnalysisSummary } from './quiz-analysis-summary'
import { QuizTypeChart } from './quiz-type-chart'
import { currentMonth } from '@/shared/utils/date'
import { Period } from './period'
import { PeriodTypeSelector } from './period-type-selector'
import { CategorySelect } from './category-select'
import { useQuery } from '@tanstack/react-query'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import Icon from '@/shared/components/icon'

interface Period {
  type: 'week' | 'month'
  value?: number
}

export function QuizAnalysis() {
  const [period, setPeriod] = useState<Period>({
    type: 'week',
  })
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0) // 0 === 전체

  const { data: categoriesData } = useQuery(queries.category.list())
  const { data: weekQuizAnswerRate } = useQuery(queries.quiz.weekAnswerRate(selectedCategoryId))
  const { data: monthQuizAnswerRate } = useQuery(
    queries.quiz.monthAnswerRate({
      categoryId: selectedCategoryId,
      date: {
        year: 2024,
        month: currentMonth(),
      },
    })
  )

  const isLoading =
    categoriesData?.categories == null || weekQuizAnswerRate == null || monthQuizAnswerRate == null

  const rateData = period.type === 'week' ? weekQuizAnswerRate : monthQuizAnswerRate

  const isNoAnalysis = !rateData?.totalQuizCount

  return (
    <section className="relative flex min-h-[500px] flex-1 flex-col rounded-none bg-white p-[20px] pb-[70px] lg:min-h-[833px] xl:min-h-[726px] xl:max-w-[520px] xl:rounded-[12px] xl:pb-[20px]">
      <h2 className="text-h4-bold text-gray-09">퀴즈 분석</h2>

      {isLoading ? (
        <Loading size="small" center />
      ) : (
        <div className="mt-[27px] xl:mt-[16px]">
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
              selectedCategoryId={selectedCategoryId}
              categories={categoriesData?.categories}
              onValueChange={(categoryId: number) => setSelectedCategoryId(categoryId)}
            />
            {isNoAnalysis ? (
              <div className="flex h-[377px] flex-col items-center justify-center rounded-[12px] border">
                <Icon name="no-analysis" />
                <div className="mb-[8px] mt-[24px] text-body1-bold-eng text-gray-09">
                  아직 분석이 없어요
                </div>
                <div className="mb-[24px] text-body2-regular text-gray-07">
                  퀴즈를 풀면 분석을 할 수 있어요
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-[16px]">
                <QuizAnalysisSummary
                  elapsedTime={rateData.elapsedTime}
                  totalQuizCount={rateData.totalQuizCount}
                  correctAnswerCount={rateData.totalQuizCount - rateData.incorrectAnswerCount}
                />
                <QuizTypeChart
                  oxRate={Math.round((rateData.mixUpQuizCount / rateData.totalQuizCount) * 100)}
                  multipleRate={Math.round(
                    (rateData.multipleQuizCount / rateData.totalQuizCount) * 100
                  )}
                />
                <HistoryChart quizzes={rateData.quizzes} periodType={period.type} />
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
