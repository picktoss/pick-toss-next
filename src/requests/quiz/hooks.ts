'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import {
  collectionQuizzesInfo,
  createQuizSetForCheck,
  createReplayDocumentQuizSet,
  deleteQuiz,
  getDirectoryQuizzes,
  getDownloadQuizzes,
  updateQuizResult,
  updateWrongQuizResult,
} from './client'
import { getQueryClient } from '@/shared/lib/tanstack-query/client'
import { queries } from '@/shared/lib/tanstack-query/query-keys'

// 아직 사용처 없음 - 검토 필요
// export const useTodayQuizSetId = () => {
//   return useQuery({
//     queryKey: ['todayQuizSetId'],
//     queryFn: async () => fetchTodayQuizSetId(),
//   })
// }

export const useDirectoryQuizzes = (directoryId: number | null) => {
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

export const useDeleteQuiz = (params: { documentId: number; quizType?: Quiz.Type }) => {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (quizId: number) => deleteQuiz(quizId),
    onSuccess: async () => {
      await queryClient.invalidateQueries(queries.quiz.listByDocument(params))
      await queryClient.invalidateQueries(queries.document.item(params.documentId))
    },
  })
}

export const useDownloadQuiz = () => {
  return useMutation({
    mutationFn: async (documentId: number) => getDownloadQuizzes(documentId),
  })
}
