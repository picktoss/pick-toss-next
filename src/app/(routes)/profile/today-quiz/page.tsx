import { getQueryClient } from '@/shared/lib/tanstack-query/client'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import TodayQuizInfo from '@/features/user/screens/today-quiz-info'

const TodayQuizPage = async () => {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(queries.quiz.todayQuizInfo())

  return <TodayQuizInfo />
}

export default TodayQuizPage
