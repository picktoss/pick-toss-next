'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

export interface GetUserResponse {
  name: string
  email: string
  role: 'ROLE_USER' | 'ROLE_ADMIN'
  point: number
  continuousQuizDatesCount: number
  maxContinuousQuizDatesCount: number
  subscription: {
    plan: 'PRO' | 'FREE'
    purchasedDate: string
    expireDate: string
  }
  documentUsage: {
    possessDocumentCount: number
    availableAiPickCount: number
    freePlanMaxPossessDocumentCount: number
    freePlanMonthlyDocumentCount: number
    proPlanMonthlyDocumentCount: number
  }
  quizNotificationEnabled: boolean
}

export const getUser = async (accessToken: string) => {
  const result = await apiClient<GetUserResponse>({
    endpoint: API_ENDPOINT.user.getUser(),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return result.data
}
