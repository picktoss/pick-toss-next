import IntroAndQuizView from '@/features/quiz/screen/intro-and-quiz-view'
import { fetchCollectionQuizSet, fetchDocumentQuizSet } from '@/requests/quiz'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    id: string
  }
  searchParams: {
    quizType: 'today' | 'document' | 'collection'
    createdAt: string
    // 문제 생성일 경우
    isFirst?: boolean
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
    isFirst,
    documentName,
    directoryEmoji,
    collectionId,
    collectionName,
    collectionEmoji,
  } = searchParams

  const todayQuizSet = { quizzes: [] } // today quiz list 가져오기
  const documentQuizSet =
    quizType === 'document' ? await fetchDocumentQuizSet({ quizSetId: params.id }) : undefined
  const collectionQuizSet =
    quizType === 'collection'
      ? await fetchCollectionQuizSet({
          collectionId: Number(collectionId),
          quizSetId: params.id,
        })
      : undefined

  const quizSet = documentQuizSet || collectionQuizSet || todayQuizSet

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
      isFirst={isFirst}
      quizzes={quizSet.quizzes}
      documentInfo={documentInfo}
      collectionInfo={collectionInfo}
    />
  )
}

export default QuizDetailPage
