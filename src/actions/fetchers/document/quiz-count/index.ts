'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

import { QuizType } from '@/actions/types/dto/quiz.dto'

interface QuizCountParams extends NextFetchRequestConfig {
  documentIds: number[]
  type: QuizType
}

interface QuizCountResponse {
  quizCount: number
}

export const quizCount = async (params: QuizCountParams) => {
  const result = await apiClient<QuizCountResponse>({
    endpoint: API_ENDPOINT.document.quizCount(),
    data: {
      documentIds: params.documentIds,
      type: params.type,
    },
  })
  return result.data
}
