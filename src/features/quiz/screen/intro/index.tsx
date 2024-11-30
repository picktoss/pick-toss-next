'use client'

import { SwitchCase } from '@/shared/components/custom/react/switch-case'
import TodayQuizIntro from './components/today-quiz-intro'
import DocumentQuizIntro from './components/document-quiz-intro'
import CollectionQuizIntro from './components/collection-quiz-intro'
import { formatDateKorean } from '@/shared/utils/date'

interface Props {
  quizType: 'today' | 'document' | 'collection'
  createdAt: string
  documentInfo?: { name: string; directoryEmoji: string }
  collectionInfo?: { name: string; emoji: string }
  onAnimationComplete: () => void
}

const QuizIntro = ({
  quizType,
  createdAt,
  documentInfo,
  collectionInfo,
  onAnimationComplete,
}: Props) => {
  const createDateText = formatDateKorean(createdAt, { month: true, day: true, dayOfWeek: true })

  return (
    <SwitchCase
      value={quizType}
      caseBy={{
        today: (
          <TodayQuizIntro createdAt={createDateText} onAnimationComplete={onAnimationComplete} />
        ),

        document: (
          <DocumentQuizIntro
            createdAt={createDateText}
            documentName={documentInfo?.name ?? ''}
            directoryEmoji={documentInfo?.directoryEmoji ?? ''}
            onAnimationComplete={onAnimationComplete}
          />
        ),
        collection: (
          <CollectionQuizIntro
            createdAt={createDateText}
            collectionName={collectionInfo?.name ?? ''}
            collectionEmoji={collectionInfo?.emoji ?? ''}
            onAnimationComplete={onAnimationComplete}
          />
        ),
      }}
    />
  )
}

export default QuizIntro
