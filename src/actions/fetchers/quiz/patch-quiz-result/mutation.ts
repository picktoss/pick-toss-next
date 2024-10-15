import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { patchQuizResult } from '.'

interface Params {
  solvingData: SolvingData
  quizSetId: string
}

export type SolvingData = {
  id: number
  answer: boolean
  elapsedTime: number
}[]

export const usePatchQuizResultMutation = () => {
  const { update } = useSession()

  return useMutation({
    mutationFn: (params: Params) =>
      patchQuizResult({
        data: {
          quizSetId: params.quizSetId,
          quizzes: params.solvingData,
        },
      }),
    onSuccess: () => update({}),
  })
}
