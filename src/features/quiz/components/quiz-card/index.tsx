'use client'

import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import React, { useState } from 'react'

interface Props {
  quiz: Quiz.Item
  header: React.ReactNode
  showAnswer?: boolean
  showExplanation?: boolean
  // userAnswer를 받으면 정답과 오답을 표시함
  userAnswer?: string
}

const QuizCard = ({
  quiz,
  header,
  showAnswer = false,
  showExplanation = false,
  userAnswer,
}: Props) => {
  const [openExplanation, setOpenExplanation] = useState(showExplanation)

  const shouldShowAnswer = showAnswer ?? openExplanation

  const renderOptions = () => {
    if (quiz.quizType === 'MULTIPLE_CHOICE' && quiz.options) {
      const chosenAlphabet = userAnswer
        ? String.fromCharCode(65 + quiz.options.findIndex((option) => option === userAnswer))
        : undefined

      return (
        <div className="mt-[12px] flex flex-col gap-[4px]">
          {quiz.options.map((option, index) => (
            <MultipleChoiceOption
              key={option}
              option={option}
              // chosenAlphabet을 넘기면 정답과 오답을 표시함
              chosenAlphabet={chosenAlphabet}
              optionAlphabet={String.fromCharCode(65 + index)}
              showAnswer={shouldShowAnswer}
              isAnswer={quiz.answer === option}
            />
          ))}
        </div>
      )
    }

    return (
      <div className="flex-center mt-[16px] gap-[6px]">
        {(['correct', 'incorrect'] as const).map((value) => (
          <OXChoice
            key={value}
            value={value}
            // chosenAnswer을 넘기면 정답과 오답을 표시함
            chosenAnswer={userAnswer}
            isAnswer={quiz.answer === value}
            showAnswer={shouldShowAnswer}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="w-full rounded-[16px] border border-border-default bg-white">
      <div className="px-[16px] py-[20px]">
        {header}

        <Text as="h3" typography="text1-bold" className="mt-[10px]">
          {quiz.question}
        </Text>

        {renderOptions()}

        {openExplanation && (
          <Text typography="text2-medium" className="mt-[20px] w-full text-text-sub">
            <b>해설</b>: {quiz.explanation}
          </Text>
        )}
      </div>

      <button
        onClick={() => setOpenExplanation((prev) => !prev)}
        className="flex-center w-full border-t border-border-divider py-[12px] text-text-sub"
      >
        <Text typography="text2-medium">{openExplanation ? '닫기' : '해설 보기'}</Text>
        <Icon
          name={openExplanation ? 'chevron-up' : 'chevron-down'}
          className="ml-[4px] size-[12px] text-icon-tertiary"
        />
      </button>
    </div>
  )
}

export default QuizCard

interface MultipleChoiceOptionProps {
  option: string
  optionAlphabet: string
  showAnswer: boolean
  isAnswer: boolean
  chosenAlphabet?: string
}

const MultipleChoiceOption = ({
  option,
  showAnswer,
  optionAlphabet,
  isAnswer,
  chosenAlphabet,
}: MultipleChoiceOptionProps) => {
  return (
    <Text
      typography="text1-medium"
      className={cn(
        'flex text-text-secondary',
        showAnswer && isAnswer && 'text-text-accent',
        showAnswer && !isAnswer && 'text-text-caption',
        chosenAlphabet && isAnswer && 'text-text-success',
        chosenAlphabet === optionAlphabet && !isAnswer && 'text-text-wrong'
      )}
    >
      <span className="mr-[2px]">{optionAlphabet}.</span>
      <span>{option}</span>
    </Text>
  )
}

const OXChoice = ({
  value,
  isAnswer,
  showAnswer,
  chosenAnswer,
}: {
  value: OXQuizAnswer
  isAnswer: boolean
  showAnswer: boolean
  chosenAnswer?: string
}) => {
  return (
    <Text
      typography="title3"
      className={cn(
        'font-suit text-text-secondary',
        showAnswer && isAnswer && 'text-text-accent',
        showAnswer && !isAnswer && 'text-text-caption',
        chosenAnswer && isAnswer && 'text-text-success',
        chosenAnswer === value && !isAnswer && 'text-text-wrong'
      )}
    >
      {value === 'correct' && 'O'}
      {value === 'incorrect' && 'X'}
    </Text>
  )
}
