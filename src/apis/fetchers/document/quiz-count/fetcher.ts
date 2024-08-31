import { API_ENDPOINT } from '@/apis/api-endpoint'
import { QuizType } from '@/apis/types/dto/quiz.dto'
import { apiClient } from '@/shared/api-client'

interface QuizCountParams extends NextFetchRequestConfig {
  accessToken: string

  documentIds: number[]
  type: QuizType
}

interface QuizCountResponse {
  quizCount: number
}

export const quizCount = async (params: QuizCountParams) => {
  return await apiClient.fetch<QuizCountResponse>({
    ...API_ENDPOINT.document.quizCount(),
    body: {
      documentIds: params.documentIds,
      type: params.type,
    },
    headers: {
      Authorization: `Bearer ${params.accessToken}`,
    },
  })
}
