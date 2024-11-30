'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { createQuizSetForCheck, fetchDirectoryQuizzes, fetchTodayQuizSetId } from '.'

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

export const useCreateCheckQuizSet = (documentId: number) => {
  return useMutation({
    mutationFn: async () => createQuizSetForCheck({ documentId }),
  })
}
