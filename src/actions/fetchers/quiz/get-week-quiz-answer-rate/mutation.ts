import { useMutation } from '@tanstack/react-query'
import { getWeekQuizAnswerRate } from '.'

export const useGetWeekQuizAnswerRateMutation = () => {
  return useMutation({
    mutationFn: getWeekQuizAnswerRate,
  })
}
