'use client'

import { useQuery } from '@tanstack/react-query'
import { getQuizSets } from '.'

export const GET_KEY_QUIZ_SETS_KEY = 'quiz-sets'

interface Params {
  quizSetId: string
}

export const useGetQuizSetsQuery = ({ quizSetId }: Params) => {
  return useQuery({
    queryKey: [GET_KEY_QUIZ_SETS_KEY],
    queryFn: () =>
      getQuizSets({
        quizSetId,
      }),
  })
}
