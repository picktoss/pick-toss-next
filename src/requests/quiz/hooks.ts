'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import {
  createQuizSetForCheck,
  createReplayDocumentQuizSet,
  fetchDirectoryQuizzes,
  fetchTodayQuizSetId,
} from '.'

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
