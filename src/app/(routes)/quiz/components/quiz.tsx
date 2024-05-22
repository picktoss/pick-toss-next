'use client'

import { QuizDTO } from '@/apis/types/dto/quiz.dto'
import QuizIntro from './quiz-intro'
import { useEffect, useState } from 'react'
import QuizHeader from './quiz-header'
import AnswerOption, { optionVariants } from './answer-option'
import { VariantProps } from 'class-variance-authority'
import Explanation from './explanation'

interface QuizProps {
  quizzes: QuizDTO[]
}

export default function Quiz({ quizzes }: QuizProps) {
  const [state, setState] = useState<'intro' | 'solving'>('intro')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [quizIndex, setQuizIndex] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [variants, setVariants] = useState<VariantProps<typeof optionVariants>['variant'][]>([])
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const curQuiz = quizzes[quizIndex]

  useEffect(() => {
    const timer = setTimeout(() => {
      setState('solving')
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const onSelectAnswer = (order: number) => {
    setSelectedOrder(order)
    setIsCorrect(curQuiz.options[order] === curQuiz.answer)

    setTimeout(() => {
      setShowResult(true)
    }, 1500)
  }

  useEffect(() => {
    if (selectedOrder == null) {
      setVariants(Array(curQuiz.options.length).fill('idle'))
    } else {
      const newVariants = curQuiz.options.map((option, idx) => {
        if (!showResult) {
          return selectedOrder === idx ? 'choose' : 'idle'
        } else {
          if (curQuiz.answer === option) {
            return 'correct'
          }
          if (selectedOrder === idx && curQuiz.answer !== option) {
            return 'incorrect'
          }

          return 'disabled'
        }
      })
      setVariants(newVariants)
    }
  }, [selectedOrder, showResult, curQuiz])

  return (
    <div className="pt-[12px]">
      {state === 'intro' ? (
        <QuizIntro quizzes={quizzes} />
      ) : (
        <div>
          <QuizHeader className="mb-[32px] px-[20px]" />
          <div className="mb-[24px] px-[20px]">
            <div className="w-full overflow-hidden rounded-[12px]">
              <div className="relative h-[8px] *:h-[8px]">
                <div className="bg-gray-02" />
                <div className="absolute left-0 top-0 w-1/4 bg-orange-04" />
              </div>
              <div className="flex flex-col gap-[8px] bg-white px-[20px] pb-[40px] pt-[32px]">
                <div className="text-small1-regular text-gray-07">
                  {curQuiz.category.name} {'>'} {curQuiz.document.name}
                </div>
                <div className="flex items-start gap-[8px]">
                  <div className="text-h3-bold text-orange-06">Q</div>
                  <div className="text-h4-bold text-gray-09">{curQuiz.question}</div>
                </div>
              </div>
            </div>
          </div>
          {curQuiz.quizType === 'MULTIPLE_CHOICE' ? (
            <div className="flex flex-col gap-[20px] px-[20px]">
              {curQuiz.options.map((option, idx) => (
                <AnswerOption
                  key={idx}
                  option={option}
                  onClick={() => onSelectAnswer(idx)}
                  order={String.fromCharCode(65 + idx)}
                  variant={variants[idx]}
                  disabled={selectedOrder != null}
                />
              ))}
            </div>
          ) : (
            <div></div>
          )}
          {showResult ? (
            <Explanation
              isCorrect={isCorrect!}
              correctItem={String.fromCharCode(
                65 + curQuiz.options.findIndex((option) => curQuiz.answer === option)
              )}
              explanation={
                '윌리엄 홀만 교수가 제시한 신식품 명명법의 주요 기준은 다섯 가지로, 소비자가 세포 기반 제품을 기존 제품과 구별할 수 있어야 하며, 전통적인 생선, 조개류, 소고기 또는 가금류에 알레르기가 있는 사람들이 세포 기반 제품을 잠재적 알레르겐으로 식별할 수 있도록 해야 합니다. 또한, 세포 기반 제품이나 기존 제품을 비하하지 않는 이름이어야 하며, 제품이 안전하고 건강하며 영양가 있다는 사실과 일치하지 않는 생각, 이미지 또는 감정을 불러일으키지 않는 중립적인 이름이어야 합니다. 마지막으로, 소비자가 제품을 식별할 수 있는 적절한 용어로 인식해야 한다고 합니다.'
              }
              next={() => {}}
              className="mt-[48px]"
            />
          ) : null}
        </div>
      )}
    </div>
  )
}
