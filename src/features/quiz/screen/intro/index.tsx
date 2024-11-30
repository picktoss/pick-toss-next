'use client'

import { SwitchCase } from '@/shared/components/custom/react/switch-case'
import TodayQuizIntro from './components/today-quiz-intro'
import DocumentQuizIntro from './components/document-quiz-intro'
import CollectionQuizIntro from './components/collection-quiz-intro'
import { useQuery } from '@tanstack/react-query'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { formatDateKorean } from '@/shared/utils/date'
import Loading from '@/shared/components/custom/loading'
import { useState } from 'react'

interface Props {
  quizType: 'today' | 'document' | 'collection'
  quizSetId: string
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
  const { data: quizSetInfo, isPending: isTodayQuizPending } = useQuery(
    queries.quiz.setRecord(quizSetId)
  )
  const { data: documentInfo, isPending: isDocumentQuizPending } = useQuery(
    queries.document.item(documentId)
  )
  const { data: collectionInfo, isPending: isCollectionQuizPending } = useQuery(
    queries.collection.info(collectionId)
  )

  const createdAtText = quizSetInfo
    ? formatDateKorean(quizSetInfo.createdAt, {
        month: true,
        day: true,
        dayOfWeek: true,
      })
    : ''

  const isLoading =
    quizType === 'today'
      ? isTodayQuizPending
      : quizType === 'document'
      ? isDocumentQuizPending || isTodayQuizPending
      : isCollectionQuizPending || isTodayQuizPending

  if (isLoading) return <Loading center />

  return (
    <SwitchCase
      value={quizType}
      caseBy={{
        today: quizSetInfo && (
          <TodayQuizIntro createdAt={createdAtText} onAnimationComplete={onAnimationComplete} />
        ),

        document: quizSetInfo && documentInfo && (
          <DocumentQuizIntro
            createdAt={createdAtText}
            documentName={documentInfo?.documentName ?? ''}
            directoryEmoji={documentInfo?.directory.emoji ?? ''}
            onAnimationComplete={onAnimationComplete}
          />
        ),

        collection: quizSetInfo && collectionInfo && (
          <CollectionQuizIntro
            createdAt={createdAtText}
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
