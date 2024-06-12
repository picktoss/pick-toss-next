import { API_ENDPOINT } from '@/apis/api-endpoint'
import { apiClient } from '@/lib/api-client'

interface DeleteQuizParams extends NextFetchRequestConfig {
  documentId: number
  quizId: number

  accessToken: string
}

export interface DeleteQuizResponse {
  quizSetId: string
}

export const deleteQuiz = async ({ documentId, quizId, accessToken }: DeleteQuizParams) => {
  return await apiClient.fetch<DeleteQuizResponse>({
    ...API_ENDPOINT.quiz.deleteQuiz(documentId, quizId),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
