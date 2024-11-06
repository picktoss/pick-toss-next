import QuizView from '@/features/quiz/screen/quiz-view'

// interface Props {
//   params: {
//     id: string
//   }
// }

const QuizDetailPage = (/* { params }: Props */) => {
  //   const quizId = params.id
  // TODO: 퀴즈 가져옴 server side

  const quizType: 'today' | 'bomb' | 'random' = 'today'

  return (
    <>
      {quizType === 'today' && <QuizView />}
      {/* {quizType === 'random' && <RandomQuizView />} */}
      {/* {quizType === 'bomb' && <BombQuizView />} */}
    </>
  )
}

export default QuizDetailPage
