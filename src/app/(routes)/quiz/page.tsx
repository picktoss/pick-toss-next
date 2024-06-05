/* eslint-disable @typescript-eslint/no-unused-vars */
import { getQuizSets } from '@/apis/fetchers/quiz/get-quiz-sets'
import Quiz from './components/quiz'
import { quizzes } from './mocks'
import { notFound } from 'next/navigation'

interface QuizProps {
  searchParams: {
    quizSetId: string
  }
}

// eslint-disable-next-line @typescript-eslint/require-await
export default async function QuizPage({ searchParams }: QuizProps) {
  if (!searchParams.quizSetId) {
    notFound()
  }

  // const { quizzes: ignore } = await getQuizSets({
  //   quizSetId: searchParams.quizSetId,
  // })

  // if (ignore.length === 0) {
  //   notFound()
  // }

  return (
    <div>
      <Quiz quizzes={quizzes} />
    </div>
  )
}
