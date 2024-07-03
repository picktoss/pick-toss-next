'use client'

import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { getWeekQuizAnswerRate } from './fetcher'

export const GET_WEEK_QUIZ_ANSWER_RATE_KEY = 'week-quiz-answer-rate'

interface Params {
  categoryId: number
}

export const useGetWeekQuizAnswerRateQuery = ({ categoryId }: Params) => {
  const { data: session } = useSession()

  return useQuery({
    queryKey: [GET_WEEK_QUIZ_ANSWER_RATE_KEY, categoryId],
    queryFn: () =>
      getWeekQuizAnswerRate({
        accessToken: session?.user.accessToken || '',
        categoryId,
      }),
    enabled: !!session?.user.accessToken,
  })
}
