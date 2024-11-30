import IntroAndQuizView from '@/features/quiz/screen/intro-and-quiz-view'
import { fetchQuizSet } from '@/requests/quiz'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    id: string
  }
  searchParams: {
    quizType: 'today' | 'document' | 'collection'
    documentId?: string
    collectionId?: string
  }
}

const QuizDetailPage = async ({ params, searchParams }: Props) => {
  const { quizType, documentId, collectionId } = searchParams
  const quizSet = await fetchQuizSet({ quizSetId: params.id })

  if (!quizSet) {
    notFound()
  }

  return (
    <IntroAndQuizView
      quizType={quizType}
      quizSetId={params.id}
      quizzes={quizSet.quizzes}
      documentId={documentId ? Number(documentId) : undefined}
      collectionId={collectionId ? Number(collectionId) : undefined}
    />
  )
}

export default QuizDetailPage
