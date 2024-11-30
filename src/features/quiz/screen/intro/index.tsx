import { SwitchCase } from '@/shared/components/custom/react/switch-case'
import TodayQuizIntro from './components/today-quiz-intro'
import DocumentQuizIntro from './components/document-quiz-intro'
import CollectionQuizIntro from './components/collection-quiz-intro'
import { useQuery } from '@tanstack/react-query'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { formatDateKorean } from '@/shared/utils/date'

interface Props {
  quizType: 'today' | 'document' | 'collection'
  quizSetId: number
  documentId?: number
  collectionId?: number
  onAnimationComplete: () => void
}

const QuizIntro = ({
  quizType,
  quizSetId,
  documentId,
  collectionId,
  onAnimationComplete,
}: Props) => {
  const { data: quizSetInfo } = useQuery(queries.quiz.setRecord(quizSetId))
  const { data: documentInfo } = useQuery(queries.document.item(documentId))
  const { data: collectionInfo } = useQuery(queries.collection.info(collectionId))

  const createdAtText = formatDateKorean(quizSetInfo?.createdAt ?? '', {
    month: true,
    day: true,
    dayOfWeek: true,
  })
  const documentName = documentInfo?.documentName
  const directoryEmoji = documentInfo?.directory.emoji
  const collectionName = collectionInfo?.name
  const collectionEmoji = collectionInfo?.emoji

  return (
    <SwitchCase
      value={quizType}
      caseBy={{
        today: (
          <TodayQuizIntro createdAt={createdAtText} onAnimationComplete={onAnimationComplete} />
        ),

        document: (
          <DocumentQuizIntro
            createdAt={createdAtText}
            documentName={documentName ?? ''}
            directoryEmoji={directoryEmoji ?? ''}
            onAnimationComplete={onAnimationComplete}
          />
        ),

        collection: (
          <CollectionQuizIntro
            createdAt={createdAtText}
            collectionName={collectionName ?? ''}
            collectionEmoji={collectionEmoji ?? ''}
            onAnimationComplete={onAnimationComplete}
          />
        ),
      }}
    />
  )
}

export default QuizIntro
