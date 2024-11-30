'use client'

import { useRef, useState } from 'react'
import QuizView from './quiz-view'
import QuizIntro from './intro'

interface Props {
  quizType: 'today' | 'document' | 'collection'
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
    setFinishedIntro(true)
  }

  if (!finishedIntro) {
    return (
      <QuizIntro
        quizType={quizType}
        createdAt={createdAt}
        documentInfo={documentInfo}
        collectionInfo={collectionInfo}
        onAnimationComplete={handleAnimationComplete}
      />
    )
  }

  return <QuizView quizzes={quizzes} />
}

export default IntroAndQuizView
