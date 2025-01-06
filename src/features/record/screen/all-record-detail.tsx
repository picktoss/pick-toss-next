'use client'

import Loading from '@/shared/components/custom/loading'
import Text from '@/shared/components/ui/text'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { formatDateKorean, formatToYYYYMMDD } from '@/shared/utils/date'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import RecordItem from '../components/record-item'
import { useEffect } from 'react'

const AllRecordDetail = () => {
  const today = new Date()
  const searchParams = useSearchParams()
  const selectedDate = searchParams.get('selectedDate') ?? formatToYYYYMMDD(today)

  const { data, isPending } = useQuery(queries.quiz.allRecords())

  useEffect(() => {
    if (selectedDate) {
      const targetElement = document.getElementById(selectedDate)
      if (targetElement) {
        // 스크롤 이동
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [selectedDate, data])

  if (isPending) return <Loading center />

  return (
    <>
      {data?.quizRecords.map((dateGroup) => (
        <div key={dateGroup.solvedDate} id={dateGroup.solvedDate} className="flex flex-col">
          <Text typography="text2-medium" color="sub" className="my-[8px]">
            {formatDateKorean(dateGroup.solvedDate, { year: true, month: true, day: true })}
          </Text>
          {dateGroup.quizRecords.map((record, index) => (
            <RecordItem
              key={record.quizSetId + '-' + index}
              type={record.quizSetType}
              name={record.name}
              quizCount={record.quizCount}
              score={record.score}
              date={dateGroup.solvedDate}
              quizSetId={record.quizSetId}
            />
          ))}
        </div>
      ))}
    </>
  )
}

export default AllRecordDetail
