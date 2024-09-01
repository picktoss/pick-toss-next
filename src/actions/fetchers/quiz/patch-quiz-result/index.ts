'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

import { SolvingData } from '@/app/(routes)/quiz/types'

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
  return await apiClient.fetch<PatchQuizResultResponse>({
    endpoint: API_ENDPOINT.quiz.patchQuizResult(),
    body: data,
  })
}
