import AiCreatingQuiz from '@/features/quiz/screen/ai-creating-quiz'

interface Props {
  searchParams: {
    documentId: string
    documentName: string
    directoryEmoji: string
  }
}

// quiz-set-id 없이 /quiz로만 오면 document에서 퀴즈를 생성하는 것으로 판단
const QuizPage = ({ searchParams }: Props) => {
  const { documentId, documentName, directoryEmoji } = searchParams

  return (
    <>
      <AiCreatingQuiz
        documentId={Number(documentId)}
        documentName={documentName}
        directoryEmoji={directoryEmoji}
      />
    </>
  )
}

export default QuizPage
