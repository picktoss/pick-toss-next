import { useQuery } from '@tanstack/react-query'
import { getTodayQuizSetId } from '.'

export const GET_TODAY_QUIZ_SET_ID_KEY = 'today-quiz-set-id'

export function useGetTodayQuizSetId() {
  return useQuery({
    queryKey: [GET_TODAY_QUIZ_SET_ID_KEY],
    queryFn: () => getTodayQuizSetId(),
  })
}
