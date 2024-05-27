import { API_ENDPOINT } from '@/apis/api-endpoint'
import { apiClient } from '@/lib/api-client'

interface GetUserParams extends NextFetchRequestConfig {
  accessToken: string
}

export interface GetUserResponse {
  name: string
  email: string
  point: number
  continuousQuizDatesCount: number
  subscription: {
    plan: 'PRO' | 'FREE'
    purchasedDate: string
    expireDate: string
  }
  documentUsage: {
    possessDocumentCount: number
    possibleUploadedDocumentCount: number
    freePlanMaxPossessDocumentCount: number
    freePlanMonthlyDocumentCount: number
    proPlanMonthlyDocumentCount: number
  }
  quizNotificationEnabled: boolean
}

export const getUser = async (params: GetUserParams) => {
  return await apiClient.fetch<GetUserResponse>({
    ...API_ENDPOINT.user.getUser(),
    headers: {
      Authorization: `Bearer ${params?.accessToken}`,
    },
  })
}
