import { SolvingData } from '@/app/(routes)/quiz/types'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { patchQuizResult } from './fetcher'

interface Params {
  solvingData: SolvingData
  quizSetId: string
}

export const usePatchQuizResultMutation = () => {
  const { data: session, update } = useSession()

  return useMutation({
    mutationFn: (params: Params) =>
      patchQuizResult({
        data: {
          quizSetId: params.quizSetId,
          quizzes: params.solvingData,
        },
        accessToken: session?.user.accessToken || '',
      }),
    onSuccess: () => update({}),
  })
}
