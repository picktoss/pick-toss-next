'use client'

import { useQuery } from '@tanstack/react-query'
import { getMonthQuizAnswerRate } from '.'

export const GET_MONTH_QUIZ_ANSWER_RATE_KEY = 'month-quiz-answer-rate'

interface Params {
  categoryId: number
  date: {
    year: number
    month: number
  }
}

export const useGetMonthQuizAnswerRateQuery = ({ categoryId, date }: Params) => {
  return useQuery({
    queryKey: [GET_MONTH_QUIZ_ANSWER_RATE_KEY, categoryId, date.year, date.month],
    queryFn: () =>
      getMonthQuizAnswerRate({
        categoryId,
        date,
      }),
  })
}
