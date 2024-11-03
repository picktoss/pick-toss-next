'use client'

import { useState } from 'react'
import CategorySelect from './category-select'
import FixedBottom from '@/shared/components/custom/fixed-bottom'
import { Button } from '@/shared/components/ui/button'
import Text from '@/shared/components/ui/text'
import { quizzes } from '@/features/quiz/config'
import SelectableQuizCard from './selectable-quiz-card'
import { Checkbox } from '@/shared/components/ui/checkbox'
import Label from '@/shared/components/ui/label'

const SelectQuizFromCollection = () => {
  // TODO: 전체 or 카테고리 배열의 첫 번째 요소 | null이면 전체
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)
  const [selectedQuizIds, setSelectedQuizIds] = useState([])

  const selectedQuizCount = selectedQuizIds.length
  return (
    <div className="mt-[24px] pb-[50px]">
      <div className="sticky top-[54px] z-20 flex h-[44px] items-center justify-between bg-white">
        <CategorySelect
          selectedCategoryId={selectedCategoryId}
          selectCategoryId={(categoryId?: number) => setSelectedCategoryId(categoryId ?? null)}
        />
        <Text typography="text2-bold" className="text-text-accent">
          {selectedQuizCount}개 선택됨
        </Text>
      </div>

      <div className="mt-[16px] flex items-center gap-[12px]">
        <Checkbox id="check-all" />
        <Label htmlFor="check-all" className="!text-text1-medium text-text-secondary">
          전체 선택
        </Label>
      </div>

      <ul className="mt-[23px] flex flex-col gap-[8px]">
        {quizzes.map((quiz) => (
          <SelectableQuizCard
            key={quiz.id}
            quiz={quiz}
            onSelect={(quizId: Quiz.Item['id']) => {}}
            selected={false}
          />
        ))}
      </ul>

      <FixedBottom className="flex gap-[6px]">
        <Button variant={'largeRound'} colors={'tertiary'} className="w-[35%]">
          초기화
        </Button>
        <Button
          variant={'largeRound'}
          colors={'primary'}
          className="flex-1"
          disabled={selectedQuizCount >= 5}
        >
          다음
        </Button>
      </FixedBottom>
    </div>
  )
}

export default SelectQuizFromCollection
