import { API_ENDPOINT } from '@/apis/api-endpoint'
import { apiClient } from '@/lib/api-client'

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
    ...API_ENDPOINT.auth.signIn(),
    body: {
      socialPlatform: params.socialPlatform,
      accessToken: params.accessToken,
    },
  })
}
