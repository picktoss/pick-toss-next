'use client'

import { SwitchCase } from '@/shared/components/custom/react/switch-case'
import { useState } from 'react'
import GoBackButton from '@/shared/components/custom/go-back-button'
import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import QuizProgressBar from '../components/quiz-progress-bar'
import MultipleOption from '../components/multiple-option'
import OXChoice from '../components/ox-choice'
import ResultQuizErrorDialog from '../components/report-quiz-error-dialog'
import QuizTimer from '../components/quiz-timer'
import QuizExplanationDrawer from '../components/quiz-explanation-drawer'

interface Props {
  quizzes: Quiz.ItemWithMetadata[]
}

const QuizView = ({ quizzes }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [step, setStep] = useState<'idle' | 'solve' | 'result'>('solve')

  // 선지가 노출된 후 카운트 활성화

  const currentQuizInput = 1

  const curQuiz = quizzes[currentQuizInput]

  return (
    <SwitchCase
      value={step}
      caseBy={{
        idle: <div>대기중</div>,

        solve: (
          <div>
            <header className="relative flex h-[54px] items-center justify-between px-[16px]">
              <GoBackButton icon="cancel" onClick={() => {}} />
              <div className="absolute right-1/2 translate-x-1/2">
                <QuizTimer isRunning={true} />
              </div>
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
              {curQuiz.quizType === 'MULTIPLE_CHOICE' && (
                <div className="mt-[40px] flex flex-col gap-[12px]">
                  {curQuiz.options.map((option, index) => (
                    <MultipleOption key={option} index={index} condition="wrong" option={option} />
                  ))}
                </div>
              )}
              {curQuiz.quizType === 'MIX_UP' && (
                <div className="mt-[74px]">
                  <OXChoice
                    condition="wrong"
                    userAnswer="X"
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    onSelect={(userAnswer: 'O' | 'X') => {}}
                  />
                </div>
              )}
            </div>

            <div className="mt-[40px] px-[16px]">
              <ResultQuizErrorDialog />
            </div>

            <QuizExplanationDrawer
              isCorrect={true}
              explanation="윌리엄 홀만 교수가 제시한 신식품 명명법의 주요 기준은 다섯 가지로, 소비자가 세포 기반
              제품을 기존 제품과 구별할 수 있어야 하며, 전통적인 생선, 조개류, 소고기 또는 가금류에
              알레르기가 있는 사람들이 세포 기반 제품을 잠재적 알레르겐으로 식별할 수 있도록 해야
              합니다. 또한, 세포 기반 제품이나 기존 제품을 비하하지 않는 이름이어야 하며, 제품이
              안전하고 건강하며 영양가 있다는 사실과 일치하지 않는 생각, 이미지 또는 감정을
              불러일으키지 않는 중립적인 이름이어야 합니다. 마지막으로, 소비자가 제품을 식별할 수
              있는 적절한 용어로 인식해야 한다고 합니다."
            />
          </div>
        ),

        result: <div>결과</div>,
      }}
    />
  )
}

export default QuizView
