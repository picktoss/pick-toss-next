'use client'

import { useQuery } from '@tanstack/react-query'
import { getWeekQuizAnswerRate } from '.'

export const GET_WEEK_QUIZ_ANSWER_RATE_KEY = 'week-quiz-answer-rate'

interface Params {
  categoryId: number
}

export const useGetWeekQuizAnswerRateQuery = ({ categoryId }: Params) => {
  return useQuery({
    queryKey: [GET_WEEK_QUIZ_ANSWER_RATE_KEY, categoryId],
    queryFn: () =>
      getWeekQuizAnswerRate({
        categoryId,
      }),
  })
}
