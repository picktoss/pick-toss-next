'use client'

import { useState } from 'react'
import CategorySelect from './category-select'
import FixedBottom from '@/shared/components/custom/fixed-bottom'
import { Button } from '@/shared/components/ui/button'
import Text from '@/shared/components/ui/text'

const SelectQuizFromCollection = () => {
  // TODO: 전체 or 카테고리 배열의 첫 번째 요소 | null이면 전체
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)
  const [selectedQuizIds, setSelectedQuizIds] = useState([])

  const selectedQuizCount = selectedQuizIds.length
  return (
    <div className="mt-[24px]">
      <div className="flex items-center justify-between">
        <CategorySelect
          selectedCategoryId={selectedCategoryId}
          selectCategoryId={(categoryId?: number) => setSelectedCategoryId(categoryId ?? null)}
        />
        <Text typography="text2-bold" className="text-text-accent">
          {selectedQuizCount}개 선택됨
        </Text>
      </div>

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
