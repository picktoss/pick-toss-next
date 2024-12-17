'use client'

import Text from '@/shared/components/ui/text'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { formatDateKorean } from '@/shared/utils/date'
import { useQuery } from '@tanstack/react-query'
import RecordItem from './record-item'

const RecordList = ({ selectedDate }: { selectedDate: string }) => {
  const { data } = useQuery(queries.quiz.dateRecords(selectedDate))

  return (
    <div className="flex flex-col">
      <Text typography="text2-medium" color="sub" className="my-[8px]">
        {formatDateKorean(selectedDate, { month: true, day: true })}
      </Text>

      {data &&
        data.quizRecords.map((record, index) => (
          <RecordItem
            key={record.quizSetId + '-' + index}
            type={record.quizSetType}
            name={record.name}
            quizCount={record.quizCount}
            score={record.score}
            date={selectedDate}
            quizSetId={record.quizSetId}
          />
        ))}
    </div>
  )
}

export default RecordList
