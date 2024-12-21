'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import {
  collectionQuizzesInfo,
  createQuizSetForCheck,
  createReplayDocumentQuizSet,
  getDirectoryQuizzes,
  updateQuizResult,
  updateWrongQuizResult,
} from './client'

// 아직 사용처 없음 - 검토 필요
// export const useTodayQuizSetId = () => {
//   return useQuery({
//     queryKey: ['todayQuizSetId'],
//     queryFn: async () => fetchTodayQuizSetId(),
//   })
// }

export const useDirectoryQuizzes = (directoryId?: number) => {
  return useQuery({
    queryKey: ['directoryQuizzes', directoryId],
    queryFn: async () => getDirectoryQuizzes({ directoryId: directoryId! }),
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
  return useMutation({
    mutationFn: async (requestBody: Quiz.Request.UpdateWrongQuizResult) =>
      updateWrongQuizResult(requestBody),
  })
}

export const useCollectionQuizzesInfo = () => {
  return useMutation({
    mutationFn: collectionQuizzesInfo,
  })
}
