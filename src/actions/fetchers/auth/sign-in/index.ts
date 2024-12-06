'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

interface SignInParams {
  socialPlatform: 'KAKAO' | 'GOOGLE'
  accessToken: string
}

interface SignInResponse {
  accessToken: string
  accessTokenExpiration: string
  signUp: boolean
}

export const signIn = async (params: SignInParams) => {
  try {
    const result = await apiClient<SignInResponse>({
      endpoint: API_ENDPOINT.auth.signIn(),
      data: {
        socialPlatform: params.socialPlatform,
        accessToken: params.accessToken,
      },
    })
    return result.data
  } catch (e) {
    throw new Error()
  }
}
