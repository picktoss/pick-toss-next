'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

interface GetWeekQuizAnswerRateParams extends NextFetchRequestConfig {
  categoryId: number
}

interface GetWeekQuizAnswerRateResponse {
  totalQuizCount: number
  mixUpQuizCount: number
  multipleQuizCount: number
  incorrectAnswerCount: number
  elapsedTime: number
  quizzes: {
    date: string
    totalQuizCount: number
    incorrectAnswerCount: number
  }[]
}

export const getWeekQuizAnswerRate = async ({ categoryId }: GetWeekQuizAnswerRateParams) => {
  const result = await apiClient<GetWeekQuizAnswerRateResponse>({
    endpoint: API_ENDPOINT.quiz.getWeekQuizAnswerRate(categoryId),
  })
  return result.data
}
