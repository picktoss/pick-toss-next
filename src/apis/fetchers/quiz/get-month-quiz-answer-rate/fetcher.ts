import { API_ENDPOINT } from '@/apis/api-endpoint'
import { apiClient } from '@/lib/api-client'

interface GetMonthQuizAnswerRateParams extends NextFetchRequestConfig {
  accessToken: string

  categoryId: number
  date: {
    year: number
    month: number
  }
}

interface GetMonthQuizAnswerRateResponse {
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

export const getMonthQuizAnswerRate = async ({
  accessToken,
  categoryId,
  date,
}: GetMonthQuizAnswerRateParams) => {
  return await apiClient.fetch<GetMonthQuizAnswerRateResponse>({
    ...API_ENDPOINT.quiz.getMonthQuizAnswerRate(categoryId, date.year, date.month),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
