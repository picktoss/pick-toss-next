'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

interface CreateQuizzesParams extends NextFetchRequestConfig {
  documentIds: number[]
  point: number
  quizType: 'MIX_UP' | 'MULTIPLE_CHOICE'
}

export interface CreateQuizzesResponse {
  quizSetId: string
}

export const createQuizzes = async ({ documentIds, point, quizType }: CreateQuizzesParams) => {
  const result = await apiClient<CreateQuizzesResponse>({
    endpoint: API_ENDPOINT.quiz.postQuizzes(),
    data: {
      documents: documentIds,
      point,
      quizType,
    },
  })
  return result.data
}
