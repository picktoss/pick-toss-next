import Text from '@/shared/components/text'
import Icon from '@/shared/components/v3/icon'
import { useQuizListContext } from '../context/quiz-list-context'
import { cn } from '@/shared/lib/utils'
import { useState } from 'react'

interface Props {
  question: string
  type: 'multiple' | 'ox'
  selectors: { key: string; sentence: string }[]
  answer: string
  explanation: string
}

// QuizCard 컴포넌트
const QuizCard = ({ question, type, selectors, answer, explanation }: Props) => {
  const { showAnswer } = useQuizListContext()
  const [isOpenExplanation, setIsOpenExplanation] = useState(false)

  return (
    <div className="w-full rounded-[16px] border border-border-default">
      <div className="px-[16px] py-[20px]">
        <div className="mb-[8px] flex items-center justify-between text-icon-tertiary">
          <Text typography="title3" className="font-suit text-text-accent">
            Q.
          </Text>
          <Icon name="menu-dots" />
        </div>

        <h3 className="text-text1-bold">{question}</h3>

        {type === 'multiple' && (
          <div className="mt-[12px] flex flex-col gap-[4px]">
            {/* 선택지들 아래 요소로 map */}
            {selectors.map((selector) => (
              <Text
                key={selector.key}
                typography="text1-medium"
                className={cn(
                  'flex text-text-secondary',
                  (showAnswer || isOpenExplanation) &&
                    (answer === selector.key ? 'text-text-accent' : 'text-text-caption')
                )}
              >
                <span className="mr-[2px]">{selector.key}.</span>
                <span>{selector.sentence}</span>
              </Text>
            ))}
          </div>
        )}

        {type === 'ox' && (
          <div className="flex-center mt-[16px] gap-[6px]">
            <button>
              <Text
                typography="title3"
                className={cn(
                  'font-suit text-text-secondary',
                  (showAnswer || isOpenExplanation) &&
                    (answer === 'o' ? 'text-text-accent' : 'text-text-caption')
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
                    (answer === 'x' ? 'text-text-accent' : 'text-text-caption')
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
