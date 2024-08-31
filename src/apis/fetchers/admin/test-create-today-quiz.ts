import { API_ENDPOINT } from '@/apis/api-endpoint'
import { apiClient } from '@/shared/api-client'

interface CreateTodayQuizParams extends NextFetchRequestConfig {
  quizSetId: string
  accessToken: string
}

export const createTodayQuiz = async ({ quizSetId, accessToken }: CreateTodayQuizParams) => {
  return await apiClient.fetch({
    ...API_ENDPOINT.test.createTodayQuiz(),
    body: {
      quizSetId,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
