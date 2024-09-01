import { getQuizSets } from '@/actions/fetchers/quiz/get-quiz-sets'
import Quiz from './components/quiz'
import { notFound } from 'next/navigation'

interface QuizProps {
  searchParams: {
    quizSetId: string
  }
}

export default async function QuizPage({ searchParams }: QuizProps) {
  if (!searchParams.quizSetId) {
    notFound()
  }

  const { quizzes, todayQuizSet } = await getQuizSets({
    quizSetId: searchParams.quizSetId,
  })

  if (quizzes.length === 0) {
    /** TODO: 퀴즈가 존재하지 않을 때에 대한 처리 필요 (문서가 짧아 퀴즈가 없는 상황 등) */
    notFound()
  }

  return (
    <div>
      <Quiz quizzes={quizzes} isTodayQuiz={todayQuizSet} />
    </div>
  )
}
