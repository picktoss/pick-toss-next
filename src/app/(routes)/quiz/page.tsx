import { getQuizSets } from '@/apis/fetchers/quiz/get-quiz-sets'
import Quiz from './components/quiz'

interface QuizProps {
  searchParams: {
    quizSetId: string
  }
}

export default async function QuizPage({ searchParams }: QuizProps) {
  const { quizzes } = await getQuizSets({
    quizSetId: searchParams.quizSetId,
  })

  return (
    <div>
      <Quiz quizzes={quizzes} />
    </div>
  )
}
