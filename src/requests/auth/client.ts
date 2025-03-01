'use client'

import { API_ENDPOINTS } from '@/shared/configs/endpoint'
import { http } from '@/shared/lib/axios/http'
import Cookies from 'js-cookie'

/** GET /auth/invite - 초대 링크 생성 */
export const getInviteLink = async () => {
  try {
    const { data } = await http.get<Auth.Response.GetInviteLink>(API_ENDPOINTS.AUTH.INVITE_LINK)
    return data
  } catch (error: unknown) {
    throw error
  }
}

/** GET /auth/invite/{invite_code}/creator - 초대 링크 생성자 정보 가져오기 */
export const getInviteCreator = async (inviteCode: string) => {
  try {
    const { data } = await http.get<Auth.Response.GetInviteCreator>(
      API_ENDPOINTS.AUTH.INVITE_CREATOR(inviteCode)
    )
    return data
  } catch (error: unknown) {
    throw error
  }
}

/** POST /auth/invite/verify - 초대 코드 인증 */
export const verifyInviteCode = async (requestBody: Auth.Request.VerifyInviteCode) => {
  try {
    await http.post(API_ENDPOINTS.AUTH.INVITE_CODE_VERIFY, requestBody)
    return true
  } catch (error: unknown) {
    console.error(error)
    return false
  }
}

/** POST /auth/invite/reward - 초대 코드 인증 후 별 지급 */
export const rewardInviteSignUp = async (requestBody: Auth.Request.RewardInviteSignUp) => {
  try {
    await http.post(API_ENDPOINTS.AUTH.REWARD_INVITE_SIGN_UP, requestBody)
    return true
  } catch (error: unknown) {
    console.error(error)
    return false
  }
}

/** POST /auth/invite/status - 초대 코드로 회원가입했는지 체크 */
export const checkSignUpWithInviteCode = async () => {
  try {
    const { data } = await http.get<Auth.Response.GetInviteStatus>(
      API_ENDPOINTS.AUTH.INVITE_SIGN_UP_CHECK
    )

    if (data.type === 'READY') {
      // 초대 코드를 받은 사용자가 회원가입을 했을 때
      Cookies.set('check-invited', 'true', { expires: 7 })
      return true
    }

    return false
  } catch (error: unknown) {
    console.error(error)
    return false
  }
}
