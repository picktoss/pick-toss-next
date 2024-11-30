'use client'

import { useRef, useState } from 'react'
import QuizView from './quiz-view'
import QuizIntro from './intro'

interface Props {
  quizType: 'today' | 'document' | 'collection'
  quizSetId: string
  quizzes: QuizWithMetadata[]
  documentId?: number
  collectionId?: number
}

const IntroAndQuizView = ({ quizType, quizSetId, quizzes, documentId, collectionId }: Props) => {
  const [finishedIntro, setFinishedIntro] = useState(false)

  const handleAnimationComplete = () => {
    setFinishedIntro(true)
  }

  if (!finishedIntro) {
    return (
      <QuizIntro
        quizType={quizType}
        quizSetId={quizSetId}
        documentId={documentId ? Number(documentId) : undefined}
        collectionId={collectionId ? Number(collectionId) : undefined}
        onAnimationComplete={handleAnimationComplete}
      />
    )
  }

  return <QuizView quizzes={quizzes} />
}

export default IntroAndQuizView
