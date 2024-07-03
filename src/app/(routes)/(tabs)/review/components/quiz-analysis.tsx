'use client'

import { HistoryChart } from './ui/history-chart'
import { useState } from 'react'
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
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0) // 0 === 전체

  const { data: categories } = useGetCategoriesQuery()

  const { data: weekQuizAnswerRate } = useGetWeekQuizAnswerRateQuery({
    categoryId: selectedCategoryId,
  })

  const { data: monthQuizAnswerRate } = useGetMonthQuizAnswerRateQuery({
    categoryId: selectedCategoryId,
    date: {
      year: 2024,
      month: currentMonth(),
    },
  })

  const isLoading = categories == null || weekQuizAnswerRate == null || monthQuizAnswerRate == null

  const rateData = period.type === 'week' ? weekQuizAnswerRate : monthQuizAnswerRate

  const isNoAnalysis = !rateData?.totalQuizCount

  return (
    <section className="relative flex min-h-[833px] flex-1 flex-col rounded-none bg-white p-[20px] pb-[70px] xl:min-h-[726px] xl:max-w-[520px] xl:rounded-[12px] xl:pb-[20px]">
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
              categories={categories}
              onValueChange={(categoryId: number) => setSelectedCategoryId(categoryId)}
            />
            {isNoAnalysis ? (
              <div className="flex h-[377px] flex-col items-center justify-center rounded-[12px] border">
                <NoAnalysisIcon />
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
                  oxRate={Math.round((rateData.multipleQuizCount / rateData.totalQuizCount) * 100)}
                  multipleRate={Math.round(
                    (rateData.mixUpQuizCount / rateData.totalQuizCount) * 100
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

function NoAnalysisIcon() {
  return (
    <svg width="85" height="87" viewBox="0 0 85 87" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12.9297" y="14.6533" width="47.7044" height="52.3585" fill="#EAECEF" />
      <rect x="12.9297" y="62.3574" width="40.7233" height="9.30818" rx="4.65409" fill="#EAECEF" />
      <path
        d="M3.61914 18.1451C3.61914 18.7877 4.14007 19.3086 4.78266 19.3086H26.8896C28.1748 19.3086 29.2166 18.2667 29.2166 16.9815V16.3998C29.2166 12.8655 26.3515 10.0004 22.8173 10.0004H8.27323C5.70285 10.0004 3.61914 12.0841 3.61914 14.6545V18.1451Z"
        fill="#D2D6DB"
      />
      <path
        d="M17.7598 71.668C20.4274 71.668 22.59 69.3948 22.59 66.5908L22.59 63.5233C22.59 62.8807 23.1109 62.3598 23.7535 62.3598L63.8616 62.3598C64.5042 62.3598 65.0251 62.8807 65.0251 63.5233L65.0251 66.5908C65.1715 68.2832 64.4982 71.668 60.6341 71.668L17.7598 71.668Z"
        fill="#D2D6DB"
      />
      <path
        d="M8.1316 10C10.7813 10 12.9292 12.2731 12.9292 15.0772L12.9292 19.3082L60.6315 19.3082L60.6315 15.0772C60.7768 13.3848 60.1081 10 56.27 10L8.1316 10Z"
        fill="#EAECEF"
      />
      <path
        d="M21.6543 20.4707H51.9059"
        stroke="#F5F7F9"
        stroke-width="2.32704"
        stroke-linecap="round"
      />
      <path
        d="M22.2383 26.2891H52.4899"
        stroke="#F5F7F9"
        stroke-width="2.32704"
        stroke-linecap="round"
      />
      <path
        d="M22.2383 32.1074H52.4899"
        stroke="#F5F7F9"
        stroke-width="2.32704"
        stroke-linecap="round"
      />
      <path
        d="M22.2383 37.9248H36.2005"
        stroke="#F5F7F9"
        stroke-width="2.32704"
        stroke-linecap="round"
      />
      <rect x="63" y="52.002" width="4" height="4" rx="0.833333" fill="#797D81" />
      <circle cx="65" cy="69.916" r="15" fill="#EAECEF" />
      <circle cx="65" cy="69.916" r="13.9583" stroke="#A2A6AB" stroke-width="2.08333" />
      <path
        d="M77.4123 56.1144C76.6312 55.3334 75.3649 55.3334 74.5838 56.1144L72.7071 57.9911L76.3153 61.5993L78.192 59.7226C78.973 58.9415 78.973 57.6752 78.192 56.8941L77.4123 56.1144Z"
        fill="#A2A6AB"
      />
      <g filter="url(#filter0_f_2873_6441)">
        <path
          d="M65 59.916C63.3555 59.916 61.7364 60.3216 60.286 61.0968C58.8357 61.872 57.5989 62.993 56.6853 64.3603C55.7717 65.7277 55.2093 67.2993 55.0482 68.9358C54.887 70.5724 55.1319 72.2235 55.7612 73.7428C56.3905 75.2622 57.3848 76.6029 58.6561 77.6461C59.9273 78.6894 61.4362 79.403 63.0491 79.7239C64.662 80.0447 66.3291 79.9628 67.9028 79.4854C69.4765 79.008 70.9082 78.1499 72.0711 76.9871L65 69.916V59.916Z"
          fill="#D2D6DB"
        />
      </g>
      <rect x="60.832" y="49.084" width="8.33333" height="4.16667" rx="0.833333" fill="#A2A6AB" />
      <defs>
        <filter
          id="filter0_f_2873_6441"
          x="53"
          y="57.916"
          width="21.0713"
          height="24"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="1" result="effect1_foregroundBlur_2873_6441" />
        </filter>
      </defs>
    </svg>
  )
}
