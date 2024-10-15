'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'
import { SolvingData } from './mutation'

interface PatchQuizResultParams extends NextFetchRequestConfig {
  data: {
    quizSetId: string
    quizzes: SolvingData
  }
}

interface PatchQuizResultResponse {
  reward: number | null
}

export const patchQuizResult = async ({ data }: PatchQuizResultParams) => {
  const result = await apiClient<PatchQuizResultResponse>({
    endpoint: API_ENDPOINT.quiz.patchQuizResult(),
    data: data,
  })
  return result.data
}
