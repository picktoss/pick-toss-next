import AiCreatingQuiz from '@/features/quiz/screen/ai-creating-quiz'

interface Props {
  searchParams: {
    documentId?: string
  }
}

// id 없이 /quiz로만 오면 document에서 퀴즈를 생성하는 것으로
const QuizPage = ({ searchParams }: Props) => {
  const { documentId } = searchParams

  return (
    <>
      <AiCreatingQuiz documentId={Number(documentId)} />
    </>
  )
}

export default QuizPage
