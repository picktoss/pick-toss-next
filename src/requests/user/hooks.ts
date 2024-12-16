'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  updateTodayQuizCount,
  updateQuizNotification,
  updateUserName,
  updateCollectionCategories,
  getUserInfo,
} from './client'
import { useUserStore } from '@/store/user'

export const useUserInfo = () => {
  const { setUserInfo } = useUserStore()

  return useMutation({
    mutationFn: async () => getUserInfo(),
    onSuccess: (userInfo) => setUserInfo(userInfo),
  })
}

export const useUpdateTodayQuizCount = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: User.Request.UpdateTodayQuizCount) => updateTodayQuizCount(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['userInfo'] }),
  })
}

export const useUpdateQuizNotification = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: User.Request.UpdateQuizNotification) =>
      updateQuizNotification(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['userInfo'] }),
  })
}

export const useUpdateUserName = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: User.Request.UpdateName) => updateUserName(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['userInfo'] }),
  })
}

export const useUpdateCollectionCategories = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: User.Request.UpdateCollectionCategories) =>
      updateCollectionCategories(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['userInfo'] }),
  })
}
