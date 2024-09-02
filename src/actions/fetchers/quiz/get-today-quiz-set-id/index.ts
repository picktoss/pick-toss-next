'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

export type TodayQuizSetType = 'READY' | 'NOT_READY' | 'DONE'

interface GetTodayQuizSetIdResponse {
  quizSetId: string
  type: TodayQuizSetType
}

export const getTodayQuizSetId = async () => {
  try {
    const result = await apiClient<GetTodayQuizSetIdResponse>({
      endpoint: API_ENDPOINT.quiz.getTodayQuizSetId(),
    })
    return result.data
  } catch (error) {
    console.error(error)
  }
}
