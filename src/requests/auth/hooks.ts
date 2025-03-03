'use client'

import { useMutation } from '@tanstack/react-query'
import { getInviteLink, rewardInviteSignUp, verifyInviteCode } from './client'
import { useUserInfo } from '../user/hooks'
import { useRef } from 'react'

/** GET /auth/invite - 초대 링크 생성
 * 내부에서 code의 유효성 검사 시행
 */
export const useInviteLink = () => {
  const retryCountRef = useRef(0)
  const MAX_RETRIES = 3

  const mutation = useMutation<Auth.Response.GetInviteLink, Error, void, unknown>({
    mutationFn: async () => {
      const linkResponse = await getInviteLink()
      return linkResponse
    },
    onSuccess: async (data) => {
      const inviteCode = data.inviteLink.split('/invite/')[1]

      if (inviteCode) {
        const isValid = await verifyInviteCode({ inviteCode })

        if (!isValid && retryCountRef.current < MAX_RETRIES) {
          // 유효하지 않은 경우 재시도 카운트 증가 후 재시도
          retryCountRef.current += 1
          setTimeout(() => {
            // setTimeout으로 지연시켜 스택 오버플로우 방지
            mutation.mutate()
          }, 100)
        } else if (!isValid) {
          console.error('유효한 초대 링크 생성 실패')
          retryCountRef.current = 0
        } else {
          // 유효한 경우 카운터 리셋
          retryCountRef.current = 0
        }
      } else {
        console.error('초대 코드를 찾을 수 없습니다')
        if (retryCountRef.current < MAX_RETRIES) {
          retryCountRef.current += 1
          setTimeout(() => {
            mutation.mutate()
          }, 100)
        } else {
          retryCountRef.current = 0
        }
      }

      return data
    },
  })

  return mutation
}

/** POST /auth/invite/reward - 초대 코드 인증 후 별 지급 */
export const useRewardInviteSignUp = () => {
  const { mutate: refetchUserInfo } = useUserInfo()

  return useMutation({
    mutationFn: async (requestBody: Auth.Request.RewardInviteSignUp) =>
      rewardInviteSignUp(requestBody),
    onSuccess: () => {
      refetchUserInfo()
    },
    // 조건부 재시도 설정
    retry: (failureCount, error) => {
      // 401 오류일 경우에만 재시도하고, 최대 3번까지
      return error && failureCount < 3
    },
    retryDelay: 500, // 1초 간격으로 재시도
  })
}
