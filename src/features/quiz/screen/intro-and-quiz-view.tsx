'use client'

import { useState } from 'react'
import QuizView from './quiz-view'
import QuizIntro from './intro'

interface Props {
  quizType: 'today' | 'document' | 'collection' | 'create'
  quizzes: QuizWithMetadata[]
  createdAt: string
  documentInfo?: { name: string; directoryEmoji: string }
  collectionInfo?: { name: string; emoji: string }
}

const IntroAndQuizView = ({
  quizType,
  quizzes,
  createdAt,
  documentInfo,
  collectionInfo,
}: Props) => {
  const [finishedIntro, setFinishedIntro] = useState(false)

  const handleAnimationComplete = () => {
    const delayTimer = setTimeout(() => {
      setFinishedIntro(true)
    }, 1000)

    return () => clearTimeout(delayTimer)
  }

  if (!finishedIntro) {
    return (
      <QuizIntro
        quizType={quizType === 'create' ? 'document' : quizType}
        createdAt={createdAt}
        documentInfo={documentInfo}
        collectionInfo={collectionInfo}
        onAnimationComplete={handleAnimationComplete}
      />
    )
  }

  return <QuizView quizzes={quizzes} isFirst={quizType === 'create'} />
}

export default IntroAndQuizView
