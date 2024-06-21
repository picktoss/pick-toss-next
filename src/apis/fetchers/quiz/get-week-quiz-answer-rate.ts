import { API_ENDPOINT } from '@/apis/api-endpoint'
import { apiClient } from '@/lib/api-client'

interface GetWeekQuizAnswerRateParams extends NextFetchRequestConfig {
  accessToken: string

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

export const getWeekQuizAnswerRate = async ({
  accessToken,
  categoryId,
}: GetWeekQuizAnswerRateParams) => {
  return await apiClient.fetch<GetWeekQuizAnswerRateResponse>({
    ...API_ENDPOINT.quiz.getWeekQuizAnswerRate(categoryId),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
