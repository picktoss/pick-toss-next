'use server'

import IntroAndQuizView from '@/features/quiz/screen/intro-and-quiz-view'
import { getQuizSetById } from '@/requests/quiz/server'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    id: string
  }
  searchParams: {
    quizSetType: Quiz.Set.Type
    createdAt: string
    // 문서 퀴즈일 경우
    documentName?: string
    directoryEmoji?: string
    // 콜렉션 퀴즈일 경우
    collectionName?: string
    collectionEmoji?: string

    redirectUrl?: string
  }
}

const QuizDetailPage = async ({ params, searchParams }: Props) => {
  const {
    quizSetType,
    createdAt,
    documentName,
    directoryEmoji = '📁',
    collectionName,
    collectionEmoji,
    redirectUrl,
  } = searchParams

  const quizSet = await getQuizSetById({
    quizSetId: params.id,
    quizSetType,
  })

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
      quizSetType={quizSetType}
      createdAt={createdAt}
      quizzes={quizSet.quizzes}
      documentInfo={documentInfo}
      collectionInfo={collectionInfo}
      redirectUrl={redirectUrl}
    />
  )
}

export default QuizDetailPage
