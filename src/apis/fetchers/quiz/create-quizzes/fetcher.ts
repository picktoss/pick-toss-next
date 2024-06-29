import { API_ENDPOINT } from '@/apis/api-endpoint'
import { apiClient } from '@/lib/api-client'

interface CreateQuizzesParams extends NextFetchRequestConfig {
  documentIds: number[]
  point: number
  quizType: 'MIX_UP' | 'MULTIPLE_CHOICE'

  accessToken: string
}

export interface CreateQuizzesResponse {
  quizSetId: string
}

export const createQuizzes = async ({
  documentIds,
  point,
  quizType,
  accessToken,
}: CreateQuizzesParams) => {
  return await apiClient.fetch<CreateQuizzesResponse>({
    ...API_ENDPOINT.quiz.postQuizzes(),
    body: {
      documents: documentIds,
      point,
      quizType,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
