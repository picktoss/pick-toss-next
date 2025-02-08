import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { useQueries } from '@tanstack/react-query'

export const useHomeData = () => {
  const [
    { data: solvedQuizCount, isPending: pending1 },
    { data: todayQuizSetInfo, isPending: pending2 },
    { data: documentList, isPending: pending3 },
    { data: consecutiveDays, isPending: pending4 },
  ] = useQueries({
    queries: [
      queries.quiz.solvedQuizCount(),
      queries.quiz.todayQuizSetInfo(),
      queries.document.list(),
      queries.quiz.consecutiveDays(),
    ],
  })

  const todaySolvedQuizCount = solvedQuizCount?.todaySolvedQuizCount ?? 0
  const quizSetId = todayQuizSetInfo?.quizSetId ?? ''
  const createdAt = todayQuizSetInfo?.createdAt ?? ''
  const type = todayQuizSetInfo?.type
  const documents = documentList?.documents ?? []
  const currentConsecutiveDays = consecutiveDays?.currentConsecutiveDays ?? 0

  return {
    todaySolvedQuizCount,
    quizSetId,
    createdAt,
    type,
    documents,
    currentConsecutiveDays,
    loading: pending1 || pending2 || pending3 || pending4,
  }
}
