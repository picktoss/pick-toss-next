import { getQuizSets } from '@/apis/fetchers/quiz/get-quiz-sets'
import Quiz from './components/quiz'
import { quizzes } from './mocks'

interface QuizProps {
  searchParams: {
    quizSetId: string
  }
}

export default async function QuizPage({ searchParams }: QuizProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { quizzes: ignore } = await getQuizSets({
    quizSetId: searchParams.quizSetId,
  })

  return (
    <div>
      <Quiz quizzes={quizzes} />
    </div>
  )
}
