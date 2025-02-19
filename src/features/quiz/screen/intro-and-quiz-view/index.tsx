'use client'

import { useState } from 'react'
import QuizIntro from '../intro'
import QuizView from '../quiz-view'

interface Props {
  quizSetType: Quiz.Set.Type
  quizzes: Quiz.Item[]
  createdAt: string
  documentInfo?: { id: string; name: string; directoryEmoji: string }
  collectionInfo?: { name: string; emoji: string }
  redirectUrl?: string
}

const IntroAndQuizView = ({
  quizSetType,
  quizzes,
  createdAt,
  documentInfo,
  collectionInfo,
  redirectUrl,
}: Props) => {
  const [finishedIntro, setFinishedIntro] = useState(false)

  const handleAnimationComplete = () => {
    const delayTimer = setTimeout(() => {
      setFinishedIntro(true)
    }, 2000)

    return () => clearTimeout(delayTimer)
  }

  if (!finishedIntro) {
    return (
      <QuizIntro
        quizSetType={quizSetType === 'FIRST_QUIZ_SET' ? 'DOCUMENT_QUIZ_SET' : quizSetType}
        createdAt={createdAt}
        documentInfo={documentInfo}
        collectionInfo={collectionInfo}
        onAnimationComplete={handleAnimationComplete}
      />
    )
  }

  return (
    <QuizView
      quizzes={quizzes}
      isFirst={quizSetType === 'FIRST_QUIZ_SET'}
      exitRedirectUrl={redirectUrl}
    />
  )
}

export default IntroAndQuizView
