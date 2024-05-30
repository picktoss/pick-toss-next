import { API_ENDPOINT } from '@/apis/api-endpoint'
import { apiClient } from '@/lib/api-client'

interface VerifyEmailCheck {
  accessToken: string
  email: string
  verificationCode: string
}

export const verifyEmailCheck = async ({
  accessToken,
  email,
  verificationCode,
}: VerifyEmailCheck) => {
  return await apiClient.fetch({
    ...API_ENDPOINT.auth.verifyEmailCheck(),
    body: {
      email: email,
      verificationCode: verificationCode,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
