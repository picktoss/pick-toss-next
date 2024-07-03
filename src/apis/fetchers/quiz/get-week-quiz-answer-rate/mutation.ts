import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { getWeekQuizAnswerRate } from './fetcher'

interface Params {
  categoryId: number
}

export const useGetWeekQuizAnswerRateMutation = () => {
  const { data: session } = useSession()

  return useMutation({
    mutationFn: ({ categoryId }: Params) =>
      getWeekQuizAnswerRate({
        accessToken: session?.user.accessToken || '',
        categoryId: categoryId,
      }),
  })
}
