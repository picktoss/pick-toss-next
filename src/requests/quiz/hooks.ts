'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchTodayQuizSetId } from '.'

export const useTodayQuizSetId = () => {
  return useQuery({
    queryKey: ['todayQuizSetId'],
    queryFn: async () => fetchTodayQuizSetId(),
  })
}
