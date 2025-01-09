'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
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
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: User.Request.UpdateTodayQuizCount) => updateTodayQuizCount(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['userInfo'] }),
  })
}

/** PATCH /members/update-quiz-notification - 사용자 알림 ON/OFF */
export const useUpdateQuizNotification = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: User.Request.UpdateQuizNotification) =>
      updateQuizNotification(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['userInfo'] }),
  })
}

/** PATCH /members/update-name - 사용자 이름 수정 */
export const useUpdateUserName = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: User.Request.UpdateName) => updateUserName(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['userInfo'] }),
  })
}

/** PATCH /members/update-collection-fields - 관심분야 태그 설정 */
export const useUpdateCollectionCategories = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: User.Request.UpdateCollectionCategories) =>
      updateCollectionCategories(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['userInfo'] }),
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
