'use client'

import { SwitchCase } from '@/shared/components/custom/react/switch-case'
import { useState } from 'react'
import { quizzes } from '../config'
import GoBackButton from '@/shared/components/custom/go-back-button'
import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import QuizProgressBar from '../components/quiz-progress-bar'
import MultipleOption from '../components/multiple-option'
import OXChoice from '../components/ox-choice'

const mockQuizzes = quizzes

const QuizView = () => {
  const [step, setStep] = useState<'idle' | 'solve' | 'result'>('solve')

  // 선지가 노출된 후 카운트 활성화

  const currentQuizInput = 1

  const curQuiz = mockQuizzes[currentQuizInput]

  return (
    <SwitchCase
      value={step}
      caseBy={{
        idle: <div>대기중</div>,

        solve: (
          <div>
            <header className="relative flex h-[54px] items-center justify-between px-[16px]">
              <GoBackButton icon="cancel" onClick={() => {}} />
              <div className="absolute right-1/2 translate-x-1/2">타이머</div>
              <Icon name="adjust-controls" className="size-[24px]" />
            </header>

            <div className="px-[16px]">
              <QuizProgressBar totalQuizCount={10} currentIndex={currentQuizInput} />
              <div className="mt-[23px]">
                <Text typography="title3" className="text-text-accent">
                  Q{currentQuizInput + 1}.
                </Text>
                <Text typography="question" className="mt-[8px]">
                  {curQuiz.question}
                </Text>
              </div>
              {curQuiz.type === 'multiple' && (
                <div className="mt-[40px] flex flex-col gap-[12px]">
                  {curQuiz.options.map((option, index) => (
                    <MultipleOption key={option} index={index} condition="wrong" option={option} />
                  ))}
                </div>
              )}
              {curQuiz.type === 'ox' && (
                <div className="mt-[74px]">
                  <OXChoice
                    condition="wrong"
                    userAnswer="X"
                    onSelect={(userAnswer: 'O' | 'X') => {}}
                  />
                </div>
              )}
            </div>
          </div>
        ),

        result: <div>결과</div>,
      }}
    />
  )
}

export default QuizView
