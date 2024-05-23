'use client'

import { QuizDTO } from '@/apis/types/dto/quiz.dto'
import QuizIntro from './quiz-intro'
import { useEffect, useState } from 'react'
import QuizHeader from './quiz-header'
import MultipleOption, { optionVariants } from './multiple-option'
import { VariantProps } from 'class-variance-authority'
import Explanation from './explanation'
import Question from './question'
import MixUpOption from './mix-up-option'
import { delay } from '@/utils/delay'

interface QuizProps {
  quizzes: QuizDTO[]
}

interface QuizProgress {
  quizIndex: number
  selectedMultipleQuizAnswer: number | null
  selectedMixUpQuizAnswer: 'correct' | 'incorrect' | null
  progress: 'idle' | 'choose' | 'result'
}

export default function Quiz({ quizzes }: QuizProps) {
  const [state, setState] = useState<'intro' | 'solving'>('intro')

  useEffect(() => {
    const timer = setTimeout(() => {
      setState('solving')
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const [multipleOptionVariants, setMultipleOptionVariants] = useState<
    VariantProps<typeof optionVariants>['variant'][]
  >([])

  const [quizProgress, setQuizProgress] = useState<QuizProgress>({
    quizIndex: 0,
    selectedMultipleQuizAnswer: null,
    selectedMixUpQuizAnswer: null,
    progress: 'idle',
  })

  const curQuiz = quizzes[quizProgress.quizIndex]
  const isCorrect =
    curQuiz.quizType === 'MULTIPLE_CHOICE'
      ? curQuiz.options[quizProgress.selectedMultipleQuizAnswer!] === curQuiz.answer
      : quizProgress.selectedMixUpQuizAnswer === curQuiz.answer

  const onSelectAnswer = async (answer: number | 'correct' | 'incorrect') => {
    if (typeof answer === 'number') {
      setQuizProgress((prev) => ({
        ...prev,
        progress: 'choose',
        selectedMultipleQuizAnswer: answer,
      }))
    } else {
      setQuizProgress((prev) => ({
        ...prev,
        progress: 'choose',
        selectedMixUpQuizAnswer: answer,
      }))
    }

    await delay(1500)

    setQuizProgress((prev) => ({
      ...prev,
      progress: 'result',
    }))
  }

  const next = () => {
    if (quizProgress.quizIndex === quizzes.length - 1) {
      return
    }

    setQuizProgress((prev) => ({
      ...prev,
      quizIndex: prev.quizIndex + 1,
    }))
  }

  useEffect(() => {
    const newMultipleOptionVariants = curQuiz.options.map((option, idx) => {
      switch (quizProgress.progress) {
        case 'idle':
          return 'idle'
        case 'choose':
          return quizProgress.selectedMultipleQuizAnswer === idx ? 'choose' : 'idle'
        case 'result':
          if (curQuiz.answer === option) {
            return 'correct'
          }
          if (quizProgress.selectedMultipleQuizAnswer === idx && curQuiz.answer !== option) {
            return 'incorrect'
          }
          return 'disabled'
      }
    })

    setMultipleOptionVariants(newMultipleOptionVariants)
  }, [curQuiz, quizProgress])

  return (
    <div className="pt-[12px]">
      {state === 'intro' ? (
        <QuizIntro quizzes={quizzes} />
      ) : (
        <div>
          <QuizHeader className="mb-[32px] px-[20px]" />
          <Question
            categoryName={curQuiz.category.name}
            documentName={curQuiz.document.name}
            question={curQuiz.question}
          />
          {curQuiz.quizType === 'MULTIPLE_CHOICE' ? (
            <div className="mt-[24px] flex flex-col gap-[20px] px-[20px]">
              {curQuiz.options.map((option, idx) => (
                <MultipleOption
                  key={idx}
                  option={option}
                  onClick={() => onSelectAnswer(idx)}
                  order={String.fromCharCode(65 + idx)}
                  variant={multipleOptionVariants[idx]}
                  disabled={quizProgress.selectedMultipleQuizAnswer != null}
                />
              ))}
            </div>
          ) : (
            <div className="mt-[40px] flex w-full justify-center gap-[10px] px-[20px] lg:gap-[24px]">
              <MixUpOption
                variant="correct"
                onClick={() => onSelectAnswer('correct')}
                progress={quizProgress.progress}
                isSelected={quizProgress.selectedMixUpQuizAnswer === 'correct'}
                isCorrect={quizProgress.selectedMixUpQuizAnswer === curQuiz.answer}
              />
              <MixUpOption
                variant="incorrect"
                onClick={() => onSelectAnswer('incorrect')}
                progress={quizProgress.progress}
                isSelected={quizProgress.selectedMixUpQuizAnswer === 'incorrect'}
                isCorrect={quizProgress.selectedMixUpQuizAnswer === curQuiz.answer}
              />
            </div>
          )}
          {quizProgress.progress === 'result' ? (
            <Explanation
              isCorrect={isCorrect}
              correctItem={
                curQuiz.quizType === 'MULTIPLE_CHOICE'
                  ? String.fromCharCode(
                      65 + curQuiz.options.findIndex((option) => curQuiz.answer === option)
                    )
                  : curQuiz.answer === 'correct'
                  ? 'O'
                  : 'X'
              }
              explanation={
                '윌리엄 홀만 교수가 제시한 신식품 명명법의 주요 기준은 다섯 가지로, 소비자가 세포 기반 제품을 기존 제품과 구별할 수 있어야 하며, 전통적인 생선, 조개류, 소고기 또는 가금류에 알레르기가 있는 사람들이 세포 기반 제품을 잠재적 알레르겐으로 식별할 수 있도록 해야 합니다. 또한, 세포 기반 제품이나 기존 제품을 비하하지 않는 이름이어야 하며, 제품이 안전하고 건강하며 영양가 있다는 사실과 일치하지 않는 생각, 이미지 또는 감정을 불러일으키지 않는 중립적인 이름이어야 합니다. 마지막으로, 소비자가 제품을 식별할 수 있는 적절한 용어로 인식해야 한다고 합니다.'
              }
              next={next}
              isLast={false}
              className="mt-[48px]"
            />
          ) : null}
        </div>
      )}
    </div>
  )
}
