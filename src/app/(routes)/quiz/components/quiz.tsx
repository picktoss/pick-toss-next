'use client'

import { QuizDTO } from '@/apis/types/dto/quiz.dto'
import QuizIntro from './quiz-intro'
import { useEffect, useState } from 'react'
import QuizHeader from './quiz-header'

interface QuizProps {
  quizzes: QuizDTO[]
}

export default function Quiz({ quizzes }: QuizProps) {
  const [state, setState] = useState<'intro' | 'solving'>('intro')
  //   const [curQuizIndex, setCurQuizIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setState('solving')
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="pt-[12px]">
      {state === 'intro' ? (
        <QuizIntro quizzes={quizzes} />
      ) : (
        <div>
          <QuizHeader className="mb-[32px]" />
          <div className="mb-[24px]">
            <div className="w-full overflow-hidden rounded-[12px]">
              <div className="relative h-[8px] *:h-[8px]">
                <div className="bg-gray-02" />
                <div className="absolute left-0 top-0 w-1/4 bg-orange-04" />
              </div>
              <div className="min-h-[152px] bg-white">퀴즈</div>
            </div>
          </div>
          <div>선택지</div>
        </div>
      )}
    </div>
  )
}
