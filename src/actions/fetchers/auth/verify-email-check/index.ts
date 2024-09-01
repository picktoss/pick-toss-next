'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

export interface VerifyEmailCheckParams extends NextFetchRequestConfig {
  email: string
  verificationCode: string
}

export const verifyEmailCheck = async ({ email, verificationCode }: VerifyEmailCheckParams) => {
  return await apiClient.fetch({
    endpoint: API_ENDPOINT.auth.verifyEmailCheck(),
    body: {
      email: email,
      verificationCode: verificationCode,
    },
  })
}
