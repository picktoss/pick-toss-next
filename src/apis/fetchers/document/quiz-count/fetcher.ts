import { API_ENDPOINT } from '@/apis/api-endpoint'
import { apiClient } from '@/lib/api-client'

interface QuizCountParams extends NextFetchRequestConfig {
  accessToken: string

  documentIds: number[]
}

interface QuizCountResponse {
  quizCount: number
}

export const quizCount = async (params: QuizCountParams) => {
  return await apiClient.fetch<QuizCountResponse>({
    ...API_ENDPOINT.document.quizCount(),
    body: {
      documentIds: params.documentIds,
    },
    headers: {
      Authorization: `Bearer ${params.accessToken}`,
    },
  })
}
