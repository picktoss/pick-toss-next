'use client'

import { useMutation } from '@tanstack/react-query'
import { rewardInviteSignUp } from './client'
import { useUserInfo } from '../user/hooks'

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
