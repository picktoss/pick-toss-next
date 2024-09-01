'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

export interface VerifyEmailParams extends NextFetchRequestConfig {
  email: string
}

export const verifyEmail = async ({ email }: VerifyEmailParams) => {
  return await apiClient.fetch({
    endpoint: API_ENDPOINT.auth.verifyEmail(),
    body: {
      email,
    },
  })
}
