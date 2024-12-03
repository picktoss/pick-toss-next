'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  fetchUserInfo,
  updateTodayQuizCount,
  updateQuizNotification,
  updateUserName,
  updateCollectionFields,
} from '.'

export const useUserInfo = () => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => fetchUserInfo(),
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

export const useUpdateCollectionFields = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: User.Request.UpdateCollectionFields) =>
      updateCollectionFields(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['userInfo'] }),
  })
}
