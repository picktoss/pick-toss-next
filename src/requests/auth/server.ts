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

/** POST /auth/invite/verify - 초대 코드 인증 */
export const verifyInviteCode = async (requestBody: Auth.Request.VerifyInviteCode) => {
  try {
    await httpServer.post(API_ENDPOINTS.AUTH.INVITE_CODE_VERIFY, requestBody)
    return true
  } catch (error: unknown) {
    return false
  }
}
