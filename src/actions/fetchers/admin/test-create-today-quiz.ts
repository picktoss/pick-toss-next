'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

interface CreateTodayQuizParams extends NextFetchRequestConfig {
  quizSetId: string
}

export const createTodayQuiz = async ({ quizSetId }: CreateTodayQuizParams) => {
  const result = await apiClient({
    endpoint: API_ENDPOINT.test.createTodayQuiz(),
    data: {
      quizSetId,
    },
  })
  return result.data
}
