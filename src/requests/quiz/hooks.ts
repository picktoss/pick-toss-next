'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchDirectoryQuizzes, fetchTodayQuizSetId } from '.'

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
