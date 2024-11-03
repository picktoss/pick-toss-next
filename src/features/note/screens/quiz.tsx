'use client'

import { Button } from '@/shared/components/ui/button'
import { useState } from 'react'
import { Switch } from '@/shared/components/ui/switch'
import Text from '@/shared/components/ui/text'
import { useQuizListContext } from '../contexts/quiz-list-context'
import { quizTypeFilters } from '../constants/quiz-type'
import QuizList from '@/features/quiz/components/quiz-list'
import QuizCard from '@/features/quiz/components/quiz-card'

const Quiz = () => {
  const [quizType, setQuizType] = useState('ALL')
  const { showAnswer, setShowAnswer } = useQuizListContext()

  // 임시
  const fakeSelectors = [
    { key: 'A', sentence: '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다' },
    { key: 'B', sentence: '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다' },
    { key: 'C', sentence: '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다' },
    { key: 'D', sentence: '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다' },
  ]
  const fakeExplanation =
    '윌리엄 홀만 교수가 제시한 신식품 명명법의 주요 기준은 다섯 가지로, 전통적인 생선, 조개류, 소고기 또는 가금류에 알레르기가 있는 사람들이 세포 기반 제품을 잠재적 알레르겐으로 식별할 수 있도록 해야 합니다. 또한, 세포 기반 제품이나 기존 제품을 비하하지 않는 이름이어야 하며, 제품이 안전하고 건강하며 영양가 있다는 사실과 일치하지 않는 생각, 이미지 또는 감정을 불러일으키지 않는 중립적인 이름이어야 합니다. 마지막으로, 소비자가 제품을 식별할 수 있는 적절한 용어로 인식해야 한다고 합니다.'

  return (
    <div className="flex flex-col items-center p-[20px] pb-[132px]">
      {/* 퀴즈 목록 컨트롤러 */}
      <div className="mb-[16px] flex w-full items-center justify-between">
        <div className="flex items-center gap-[8px]">
          {quizTypeFilters.map((type) => (
            <Button
              key={type.key}
              variant="smallRound"
              colors={quizType === type.key ? 'selected' : 'outlined'}
              onClick={() => setQuizType(type.key)}
            >
              {type.label}
            </Button>
          ))}
        </div>
        <div className="flex items-center">
          <Text typography="text2-medium" className="mr-[8px] text-text-sub">
            정답 표시
          </Text>
          <Switch onClick={() => setShowAnswer(!showAnswer)} />
        </div>
      </div>

      {/* 퀴즈 카드 */}
      <QuizList>
        {Array.from({ length: 5 }).map((_, idx) => (
          <QuizCard
            key={idx}
            headerComponent={
              <Text typography="title3" className="font-suit text-text-accent">
                Q.
              </Text>
            }
            quizType="multiple"
            question={'식물기반 단백질 시장에서 대기업의 참여가 늘어나는 이유는 무엇인가요?'}
            selectors={fakeSelectors}
            answer={'A'}
            explanation={fakeExplanation}
          />
        ))}
      </QuizList>
    </div>
  )
}

export default Quiz
