'use client'

import { useMutation } from '@tanstack/react-query'
import {
  updateTodayQuizCount,
  updateQuizNotification,
  updateUserName,
  updateCollectionCategories,
  getUserInfo,
  deleteAccount,
} from './client'
import { useUserStore } from '@/store/user'
import { signOut } from 'next-auth/react'
import { clearAllCookies } from '@/shared/utils/storage'

/** GET /members/info - Get member info */
export const useUserInfo = () => {
  const { setUserInfo } = useUserStore()

  return useMutation({
    mutationFn: async () => getUserInfo(),
    onSuccess: (userInfo) => setUserInfo(userInfo),
  })
}

/** PATCH /members/update-today-quiz-count - 오늘의 퀴즈 관리(오늘의 퀴즈 개수 설정) */
export const useUpdateTodayQuizCount = () => {
  const { mutate: refetchUserInfo } = useUserInfo()

  return useMutation({
    mutationFn: async (payload: User.Request.UpdateTodayQuizCount) => updateTodayQuizCount(payload),
    onSuccess: () => refetchUserInfo(),
  })
}

/** PATCH /members/update-quiz-notification - 사용자 알림 ON/OFF */
export const useUpdateQuizNotification = () => {
  const { mutate: refetchUserInfo } = useUserInfo()

  return useMutation({
    mutationFn: async (payload: User.Request.UpdateQuizNotification) =>
      updateQuizNotification(payload),
    onSuccess: () => refetchUserInfo(),
  })
}

/** PATCH /members/update-name - 사용자 이름 수정 */
export const useUpdateUserName = () => {
  const { mutate: refetchUserInfo } = useUserInfo()

  return useMutation({
    mutationFn: async (payload: User.Request.UpdateName) => updateUserName(payload),
    onSuccess: () => refetchUserInfo(),
  })
}

/** PATCH /members/update-collection-fields - 관심분야 태그 설정 */
export const useUpdateCollectionCategories = () => {
  const { mutate: refetchUserInfo } = useUserInfo()

  return useMutation({
    mutationFn: async (payload: User.Request.UpdateCollectionCategories) =>
      updateCollectionCategories(payload),
    onSuccess: () => refetchUserInfo(),
  })
}

/** DELETE /members/withdrawal - 회원 탈퇴 */
export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: async (payload: User.Request.DeleteAccount) => deleteAccount(payload),
    onSuccess: async () => {
      clearAllCookies()
      localStorage.clear()
      sessionStorage.clear()

      await signOut({
        redirect: true,
        callbackUrl: '/',
      })
    },
  })
}
