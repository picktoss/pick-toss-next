'use client'

import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { quizCount } from './fetcher'
import { QuizType } from '@/apis/types/dto/quiz.dto'

interface Params {
  documentIds: number[]
  type: QuizType
}

export function useQuizCountMutation() {
  const { data: session } = useSession()

  return useMutation({
    mutationFn: ({ documentIds, type }: Params) =>
      quizCount({
        accessToken: session?.user.accessToken || '',
        documentIds,
        type,
      }),
  })
}
