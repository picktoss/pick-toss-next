'use client'

import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { getMonthQuizAnswerRate } from './fetcher'
import { QueryOptions } from '@/apis/types/query'

export const GET_MONTH_QUIZ_ANSWER_RATE_KEY = 'month-quiz-answer-rate'

interface Params {
  categoryId: number
  date: {
    year: number
    month: number
  }

  options?: QueryOptions
}

export const useGetMonthQuizAnswerRateQuery = ({ categoryId, date, options }: Params) => {
  const { data: session } = useSession()

  return useQuery({
    queryKey: [GET_MONTH_QUIZ_ANSWER_RATE_KEY, categoryId, date.year, date.month],
    queryFn: () =>
      getMonthQuizAnswerRate({
        accessToken: session?.user.accessToken || '',
        categoryId: categoryId,
        date,
      }),
    enabled: !!session?.user.accessToken && options?.enabled,
  })
}
