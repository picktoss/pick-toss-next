/* eslint-disable @typescript-eslint/no-unused-vars */
import { quizzes } from '@/features/quiz/config'
import BombQuizView from '@/features/quiz/screen/bomb-quiz-view'
import QuizView from '@/features/quiz/screen/quiz-view'
import RandomQuizView from '@/features/quiz/screen/random-quiz-view'
import { fetchQuizSet } from '@/requests/quiz'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    id: string
  }
  searchParams: {
    quizType: 'today' | 'bomb' | 'random'
  }
}

const QuizDetailPage = ({ params, searchParams }: Props) => {
  const quizType = searchParams.quizType
  // const quizSet = await fetchQuizSet({ quizSetId: params.id })

  // if (!quizSet) {
  //   notFound()
  // }

  return (
    <>
      {quizType === 'today' && <QuizView quizzes={quizzes} />}
      {/* {quizType === 'today' && <QuizView quizzes={quizSet.quizzes} />} */}
      {/* {quizType === 'random' && <RandomQuizView />} */}
      {quizType === 'bomb' && <BombQuizView />}
    </>
  )
}
// const QuizDetailPage = async ({ params, searchParams }: Props) => {
//   const quizType = searchParams.quizType
//   const quizSet = await fetchQuizSet({ quizSetId: params.id })

//   if (!quizSet) {
//     notFound()
//   }

//   return (
//     <>
//       {quizType === 'today' && <QuizView quizzes={quizzes} />}
//       {/* {quizType === 'today' && <QuizView quizzes={quizSet.quizzes} />} */}
//       {quizType === 'random' && <RandomQuizView />}
// {quizType === 'bomb' && <BombQuizView />}
//     </>
//   )
// }

export default QuizDetailPage
