'use server'

import { API_ENDPOINTS } from '@/shared/configs/endpoint'
import { httpServer } from '@/shared/lib/axios/http-server'

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
    const { data } = await httpServer.post<SignInResponse>(API_ENDPOINTS.AUTH.LOGIN, params)
    return data
  } catch (error) {
    throw error
  }
}
