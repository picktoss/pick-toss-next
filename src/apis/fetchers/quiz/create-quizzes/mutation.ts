'use client'

import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { createQuizzes } from './fetcher'
import { QuizType } from '@/apis/types/dto/quiz.dto'

interface Params {
  documentIds: number[]
  count: number
  quizType: QuizType
}

export function useCreateQuizzesMutation() {
  const { data: session, update } = useSession()

  return useMutation({
    mutationFn: ({ quizType, documentIds, count }: Params) =>
      createQuizzes({
        documentIds,
        point: count,
        quizType,
        accessToken: session?.user.accessToken || '',
      }),
    onSuccess: () => update({}),
  })
}
