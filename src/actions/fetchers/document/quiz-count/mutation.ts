'use client'

import { useMutation } from '@tanstack/react-query'
import { quizCount } from '.'
import { QuizType } from '@/actions/types/dto/quiz.dto'

interface Params {
  documentIds: number[]
  type: QuizType
}

export function useQuizCountMutation() {
  return useMutation({
    mutationFn: ({ documentIds, type }: Params) =>
      quizCount({
        documentIds,
        type,
      }),
  })
}
