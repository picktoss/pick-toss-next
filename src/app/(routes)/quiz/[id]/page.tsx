/* eslint-disable @typescript-eslint/no-unused-vars */
import { quizzes } from '@/features/quiz/config'
import QuizView from '@/features/quiz/screen/quiz-view'
import { fetchQuizSet } from '@/requests/quiz'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    id: string
  }
}

const QuizDetailPage = async ({ params }: Props) => {
  const quizSet = await fetchQuizSet({ quizSetId: params.id })

  if (!quizSet) {
    notFound()
  }

  return <QuizView quizzes={quizzes} />
}

export default QuizDetailPage
