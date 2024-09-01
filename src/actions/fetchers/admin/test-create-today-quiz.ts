'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

interface CreateTodayQuizParams extends NextFetchRequestConfig {
  quizSetId: string
}

export const createTodayQuiz = async ({ quizSetId }: CreateTodayQuizParams) => {
  return await apiClient.fetch({
    endpoint: API_ENDPOINT.test.createTodayQuiz(),
    body: {
      quizSetId,
    },
  })
}
