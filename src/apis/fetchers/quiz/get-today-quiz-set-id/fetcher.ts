import { API_ENDPOINT } from '@/apis/api-endpoint'
import { apiClient } from '@/shared/api-client'

interface GetTodayQuizSetIdParams extends NextFetchRequestConfig {
  accessToken: string
}

export type TodayQuizSetType = 'READY' | 'NOT_READY' | 'DONE'

interface GetTodayQuizSetIdResponse {
  quizSetId: string
  type: TodayQuizSetType
}

export const getTodayQuizSetId = async ({ accessToken }: GetTodayQuizSetIdParams) => {
  return await apiClient.fetch<GetTodayQuizSetIdResponse>({
    ...API_ENDPOINT.quiz.getTodayQuizSetId(),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
