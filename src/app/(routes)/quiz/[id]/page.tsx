import IntroAndQuizView from '@/features/quiz/screen/intro-and-quiz-view'
import { fetchQuizSet } from '@/requests/quiz'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    id: string
  }
  searchParams: {
    quizType: 'today' | 'document' | 'collection'
    createdAt: string
    documentName?: string
    directoryEmoji?: string
    collectionName?: string
    collectionEmoji?: string
  }
}

const QuizDetailPage = async ({ params, searchParams }: Props) => {
  const { quizType, createdAt, documentName, directoryEmoji, collectionName, collectionEmoji } =
    searchParams
  const quizSet = await fetchQuizSet({ quizSetId: params.id })

  const hasDocumentInfo = documentName !== undefined && directoryEmoji !== undefined
  const hasCollectionInfo = collectionName !== undefined && collectionEmoji !== undefined

  const documentInfo = hasDocumentInfo
    ? { name: documentName, directoryEmoji: directoryEmoji }
    : undefined
  const collectionInfo = hasCollectionInfo
    ? { name: collectionName, emoji: collectionEmoji }
    : undefined

  if (!quizSet) {
    notFound()
  }

  return (
    <IntroAndQuizView
      quizType={quizType}
      createdAt={createdAt}
      quizzes={quizSet.quizzes}
      documentInfo={documentInfo}
      collectionInfo={collectionInfo}
    />
  )
}

export default QuizDetailPage
