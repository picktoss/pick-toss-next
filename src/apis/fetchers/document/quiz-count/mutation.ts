'use client'

import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { quizCount } from './fetcher'

interface Params {
  documentIds: number[]
}

export function useQuizCountMutation() {
  const { data: session } = useSession()

  return useMutation({
    mutationFn: ({ documentIds }: Params) =>
      quizCount({
        accessToken: session?.user.accessToken || '',
        documentIds,
      }),
  })
}
