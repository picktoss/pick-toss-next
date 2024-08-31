import { API_ENDPOINT } from '@/apis/api-endpoint'
import { apiClient } from '@/shared/api-client'

interface DeleteQuizParams extends NextFetchRequestConfig {
  documentId: number
  quizSetId: string
  quizId: number

  accessToken: string
}

export interface DeleteQuizResponse {
  quizSetId: string
}

export const deleteQuiz = async ({
  documentId,
  quizSetId,
  quizId,
  accessToken,
}: DeleteQuizParams) => {
  return await apiClient.fetch<DeleteQuizResponse>({
    ...API_ENDPOINT.quiz.deleteQuiz(documentId, quizSetId, quizId),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
