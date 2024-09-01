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
  return await apiClient.fetch<CreateQuizzesResponse>({
    endpoint: API_ENDPOINT.quiz.postQuizzes(),
    body: {
      documents: documentIds,
      point,
      quizType,
    },
  })
}
