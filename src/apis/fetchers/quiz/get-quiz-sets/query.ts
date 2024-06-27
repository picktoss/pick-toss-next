'use client'

import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { getQuizSets } from './fetcher'

export const GET_KEY_QUIZ_SETS_KEY = 'quiz-sets'

interface Params {
  quizSetId: string
}

export const useGetQuizSetsQuery = ({ quizSetId }: Params) => {
  const { data: session } = useSession()

  return useQuery({
    queryKey: [GET_KEY_QUIZ_SETS_KEY],
    queryFn: () =>
      getQuizSets({
        quizSetId,
        accessToken: session?.user.accessToken || '',
      }),
    enabled: !!session?.user.accessToken,
  })
}
