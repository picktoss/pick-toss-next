import { API_ENDPOINT } from '@/apis/api-endpoint'
import { apiClient } from '@/lib/api-client'

interface VerifyEmail {
  accessToken: string
  email: string
}

export const verifyEmail = async ({ accessToken, email }: VerifyEmail) => {
  return await apiClient.fetch({
    ...API_ENDPOINT.auth.verifyEmail(),
    body: {
      email: email,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
