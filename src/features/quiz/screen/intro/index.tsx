'use client'

import { SwitchCase } from '@/shared/components/custom/react/switch-case'
import TodayQuizIntro from './components/today-quiz-intro'
import DocumentQuizIntro from './components/document-quiz-intro'
import CollectionQuizIntro from './components/collection-quiz-intro'
import { formatDateKorean } from '@/shared/utils/date'
import { useDynamicThemeColor } from '@/shared/hooks/use-dynamic-theme-color'

interface Props {
  quizSetType: Quiz.Set.Type
  createdAt: string
  documentInfo?: { name: string; directoryEmoji: string }
  collectionInfo?: { name: string; emoji: string }
  onAnimationComplete: () => void
}

const QuizIntro = ({
  quizSetType,
  createdAt,
  documentInfo,
  collectionInfo,
  onAnimationComplete,
}: Props) => {
  useDynamicThemeColor('#F5F7F9', '#FFFFFF')
  const createDateText = formatDateKorean(createdAt, { month: true, day: true, dayOfWeek: true })

  return (
    <SwitchCase
      value={quizSetType}
      caseBy={{
        TODAY_QUIZ_SET: (
          <TodayQuizIntro createdAt={createDateText} onAnimationComplete={onAnimationComplete} />
        ),

        DOCUMENT_QUIZ_SET: (
          <DocumentQuizIntro
            createdAt={createDateText}
            documentName={documentInfo?.name ?? ''}
            directoryEmoji={documentInfo?.directoryEmoji ?? ''}
            onAnimationComplete={onAnimationComplete}
          />
        ),
        COLLECTION_QUIZ_SET: (
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
