'use client'

import Text from '@/shared/components/ui/text'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { useQuery } from '@tanstack/react-query'

const ConsecutiveDays = ({ selectedDate }: { selectedDate: string }) => {
  const { data } = useQuery(queries.quiz.dateRecords(selectedDate))

  return (
    <div className="flex-center flex-col gap-[8px] border-b border-border-divider pb-[20px] pt-[10px]">
      <Text typography="title3">
        <Text as={'span'} color="accent">
          {data?.currentConsecutiveDays}
        </Text>
        일 연속으로 푸는 중
      </Text>

      <Text typography="text1-medium" color="caption">
        최장 연속일: {data?.maxConsecutiveDays}일
      </Text>
    </div>
  )
}

export default ConsecutiveDays
