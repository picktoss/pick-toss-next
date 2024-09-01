'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

interface SignInParams extends NextFetchRequestConfig {
  socialPlatform: 'KAKAO' | 'GOOGLE'
  accessToken: string
}

interface SignInResponse {
  accessToken: string
  accessTokenExpiration: string
}

export const signIn = async (params: SignInParams) => {
  return await apiClient.fetch<SignInResponse>({
    endpoint: API_ENDPOINT.auth.signIn(),
    body: {
      socialPlatform: params.socialPlatform,
      accessToken: params.accessToken,
    },
  })
}
