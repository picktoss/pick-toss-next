'use client'

import Icon from '@/shared/components/icon'
import { SwitchCase } from '@/shared/components/react/switch-case'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import { useState } from 'react'
import { Quiz } from '../..'

interface Props {
  quiz: Quiz
}

const QuizCard = ({ quiz }: Props) => {
  const [isOpenExplanation, setIsOpenExplanation] = useState(false)

  return (
    <div className="w-full rounded-[16px] border border-border-default bg-white">
      <div className="px-[16px] py-[20px]">
        <Text typography="title3" className="font-suit text-text-accent">
          Q.
        </Text>

        <Text as="h3" typography="text1-bold" className="mt-[8px]">
          {quiz.question}
        </Text>

        <SwitchCase
          value={quiz.type}
          caseBy={{
            multiple: (
              <div className="mt-[12px] flex flex-col gap-[4px]">
                {quiz.type === 'multiple' &&
                  quiz.options?.map((option, idx) => (
                    <Text
                      key={option}
                      typography="text1-medium"
                      className={cn(
                        'flex text-text-secondary',
                        isOpenExplanation &&
                          (quiz.answer === option ? 'text-text-accent' : 'text-text-caption')
                      )}
                    >
                      <span className="mr-[2px]">{getAlphabetIndex(idx)}.</span>
                      <span>{option}</span>
                    </Text>
                  ))}
              </div>
            ),

            ox: (
              <div className="flex-center mt-[16px] gap-[6px]">
                <Text
                  typography="title3"
                  className={cn(
                    'font-suit text-text-secondary',
                    quiz.type === 'ox' &&
                      (quiz.answer === 'O' ? 'text-text-accent' : 'text-text-caption')
                  )}
                >
                  O
                </Text>
                <Text
                  typography="title3"
                  className={cn(
                    'font-suit text-text-secondary',
                    quiz.type === 'ox' &&
                      (quiz.answer === 'X' ? 'text-text-accent' : 'text-text-caption')
                  )}
                >
                  X
                </Text>
              </div>
            ),
          }}
        />

        {isOpenExplanation && (
          <Text typography="text2-medium" className="mt-[20px] w-full text-text-sub">
            <b>해설</b>: {quiz.explanation}
          </Text>
        )}
      </div>

      {/* 해설 버튼 */}
      <button
        onClick={() => setIsOpenExplanation(!isOpenExplanation)}
        className="flex-center w-full border-t border-border-divider py-[12px] text-text-sub"
      >
        <Text typography="text2-medium">{isOpenExplanation ? '닫기' : '해설 보기'}</Text>
        <Icon
          name={isOpenExplanation ? 'chevron-up' : 'chevron-down'}
          className="ml-[4px] size-[12px] text-icon-tertiary"
        />
      </button>
    </div>
  )
}

export default QuizCard

const getAlphabetIndex = (idx: number) => String.fromCharCode(65 + idx)
