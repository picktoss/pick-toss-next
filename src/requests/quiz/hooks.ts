'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import {
  createQuizSetForCheck,
  createReplayDocumentQuizSet,
  fetchDirectoryQuizzes,
  fetchTodayQuizSetId,
  updateQuizResult,
  updateWrongQuizResult,
} from '.'
import { getQueryClient } from '@/shared/lib/tanstack-query/client'
import { queries } from '@/shared/lib/tanstack-query/query-keys'

export const useTodayQuizSetId = () => {
  return useQuery({
    queryKey: ['todayQuizSetId'],
    queryFn: async () => fetchTodayQuizSetId(),
  })
}

export const useDirectoryQuizzes = (directoryId: number | null) => {
  return useQuery({
    queryKey: ['directoryQuizzes', directoryId],
    queryFn: async () => fetchDirectoryQuizzes({ directoryId: directoryId! }),
    enabled: !!directoryId,
  })
}

export const useCreateCheckQuizSet = () => {
  return useMutation({
    mutationFn: async (documentId: number) => createQuizSetForCheck({ documentId }),
  })
}

export const useReplayDocumentQuiz = () => {
  return useMutation({
    mutationFn: async (payload: {
      documentId: number
      requestBody: Quiz.Request.CreateReplayQuizSet
    }) => createReplayDocumentQuizSet(payload),
  })
}

export const useUpdateQuizResult = () => {
  return useMutation({
    mutationFn: async (requestBody: Quiz.Request.UpdateQuizResult) => updateQuizResult(requestBody),
  })
}

export const useUpdateWrongQuizResult = () => {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (requestBody: Quiz.Request.UpdateWrongQuizResult) =>
      updateWrongQuizResult(requestBody),
    onSuccess: async () => {
      await queryClient.invalidateQueries(queries.quiz.bomb())
      window.location.reload()
    },
  })
}
