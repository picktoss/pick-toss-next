'use client'

import { SwitchCase } from '@/shared/components/custom/react/switch-case'
import { useState } from 'react'
import { quizzes } from '../config'

const mockQuizzes = quizzes

const QuizView = () => {
  const [step, setStep] = useState<'idle' | 'solve' | 'result'>('idle')

  // 선지가 노출된 후 카운트 활성화

  return (
    <SwitchCase
      value={step}
      caseBy={{
        idle: <div>대기중</div>,

        solve: (
          <div>
            <header></header>
            <div>풀기</div>
          </div>
        ),

        result: <div>결과</div>,
      }}
    />
  )
}

export default QuizView
