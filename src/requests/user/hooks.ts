'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  updateTodayQuizCount,
  updateQuizNotification,
  updateUserName,
  updateCollectionCategories,
} from './client'

// 아직 사용처 없음 - 검토 필요
// export const useUserInfo = () => {
//   return useQuery({
//     queryKey: ['userInfo'],
//     queryFn: async () => fetchUserInfo(),
//   })
// }

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
