import IntroAndQuizView from '@/features/quiz/screen/intro-and-quiz-view'
import { getQuizSetTypeEnum } from '@/features/quiz/utils'
import { fetchQuizSetById } from '@/requests/quiz'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    id: string
  }
  searchParams: {
    quizType: 'today' | 'document' | 'collection' | 'create'
    createdAt: string
    // 문서 퀴즈일 경우
    documentName?: string
    directoryEmoji?: string
    // 콜렉션 퀴즈일 경우
    collectionId?: string
    collectionName?: string
    collectionEmoji?: string
  }
}

const QuizDetailPage = async ({ params, searchParams }: Props) => {
  const {
    quizType,
    createdAt,
    documentName,
    directoryEmoji,
    collectionId,
    collectionName,
    collectionEmoji,
  } = searchParams

  const quizSet = await fetchQuizSetById({
    quizSetId: params.id,
    collectionId: quizType === 'collection' ? Number(collectionId) : undefined,
    quizSetType: getQuizSetTypeEnum(quizType),
  })

  const hasDocumentInfo = documentName !== undefined && directoryEmoji !== undefined
  const hasCollectionInfo =
    collectionId !== undefined && collectionName !== undefined && collectionEmoji !== undefined

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
