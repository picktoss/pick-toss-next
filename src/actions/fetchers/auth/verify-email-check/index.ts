'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

export interface VerifyEmailCheckParams extends NextFetchRequestConfig {
  email: string
  verificationCode: string
}

export const verifyEmailCheck = async ({ email, verificationCode }: VerifyEmailCheckParams) => {
  const result = await apiClient({
    endpoint: API_ENDPOINT.auth.verifyEmailCheck(),
    data: {
      email: email,
      verificationCode: verificationCode,
    },
  })
  return result.data
}
