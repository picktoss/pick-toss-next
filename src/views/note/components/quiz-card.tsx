'use client'

import Text from '@/shared/components/ui/text'
import { useQuizListContext } from '../context/quiz-list-context'
import { cn } from '@/shared/lib/utils'
import { useState } from 'react'
import Icon, { IconProps } from '@/shared/components/icon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'

interface Props {
  headerComponent: JSX.Element
  question: string
  quizType: 'multiple' | 'ox'
  selectors?: { key: string; sentence: string }[]
  answer: string
  explanation: string
  isReviewPick?: boolean
  pickReason?: 'timeout' | { wrongAnswer: string }
}

// QuizCard 컴포넌트
const QuizCard = ({
  headerComponent,
  question,
  quizType,
  selectors,
  answer,
  explanation,
  isReviewPick,
  pickReason,
}: Props) => {
  const { showAnswer } = useQuizListContext()
  const [isOpenExplanation, setIsOpenExplanation] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuItems = [
    { key: 'add-collection', label: '컬렉션에 추가', iconName: 'book-mark' },
    { key: 'delete', label: '문서 삭제', iconName: 'bin' },
  ]

  return (
    <div className="w-full rounded-[16px] border border-border-default">
      <div className="px-[16px] py-[20px]">
        <div className="relative mb-[8px] flex items-center justify-between text-icon-tertiary">
          {headerComponent}

          {/* menu */}
          <DropdownMenu onOpenChange={(open) => setIsMenuOpen(open)}>
            <DropdownMenuTrigger className={cn('ml-[16px]', isMenuOpen && 'text-icon-disabled')}>
              <Icon name="menu-dots" className="size-[24px]" />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-background-base-01 p-0">
              {menuItems.map((menuItem, index) => (
                <DropdownMenuItem
                  key={menuItem.key}
                  className={cn(
                    'border-t border-border-divider w-[240px] px-[20px] py-[16px]',
                    index === 0 && 'border-none',
                    menuItem.key === 'delete' && 'text-text-critical'
                  )}
                  onClick={() => alert('clicked' + menuItem.label)}
                >
                  <Text
                    key={menuItem.key}
                    typography="subtitle2-medium"
                    className="flex w-full items-center justify-between"
                  >
                    {menuItem.label}
                    <Icon name={menuItem.iconName as IconProps['name']} />
                  </Text>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <h3 className="text-text1-bold">{question}</h3>

        {quizType === 'multiple' && (
          <div className="mt-[12px] flex flex-col gap-[4px]">
            {/* 선택지들 아래 요소로 map */}
            {selectors &&
              selectors.map((selector) => (
                <Text
                  key={selector.key}
                  typography="text1-medium"
                  className={cn(
                    'flex text-text-secondary',
                    (showAnswer || isOpenExplanation) &&
                      (answer === selector.key ? 'text-text-accent' : 'text-text-caption'),
                    isReviewPick &&
                      (answer === selector.key ? 'text-text-success' : 'text-text-caption'),
                    typeof pickReason === 'object' &&
                      pickReason.wrongAnswer &&
                      selector.key === pickReason.wrongAnswer &&
                      'text-text-wrong'
                  )}
                >
                  <span className="mr-[2px]">{selector.key}.</span>
                  <span>{selector.sentence}</span>
                </Text>
              ))}
          </div>
        )}

        {quizType === 'ox' && (
          <div className="flex-center mt-[16px] gap-[6px]">
            <button>
              <Text
                typography="title3"
                className={cn(
                  'font-suit text-text-secondary',
                  (showAnswer || isOpenExplanation) &&
                    (answer === 'o' ? 'text-text-accent' : 'text-text-caption'),
                  isReviewPick && answer === 'o' && 'text-text-success',
                  typeof pickReason === 'object' &&
                    pickReason.wrongAnswer &&
                    'o' === pickReason.wrongAnswer &&
                    'text-text-wrong'
                )}
              >
                O
              </Text>
            </button>
            <button>
              <Text
                typography="title3"
                className={cn(
                  'font-suit text-text-secondary',
                  (showAnswer || isOpenExplanation) &&
                    (answer === 'x' ? 'text-text-accent' : 'text-text-caption'),
                  isReviewPick && answer === 'x' && 'text-text-success',
                  typeof pickReason === 'object' &&
                    pickReason.wrongAnswer &&
                    'x' === pickReason.wrongAnswer &&
                    'text-text-wrong'
                )}
              >
                X
              </Text>
            </button>
          </div>
        )}

        {isOpenExplanation && (
          <Text typography="text2-medium" className="mt-[20px] w-full text-text-sub">
            <b>해설</b>: {explanation}
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
