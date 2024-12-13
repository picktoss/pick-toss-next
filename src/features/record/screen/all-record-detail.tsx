'use client'

import Loading from '@/shared/components/custom/loading'
import Text from '@/shared/components/ui/text'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { formatDateKorean, getFormattedDate } from '@/shared/utils/date'
import { useUserStore } from '@/store/user'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import RecordItem from '../components/record-item'
import { useEffect } from 'react'

const AllRecordDetail = () => {
  const today = new Date()
  const searchParams = useSearchParams()
  const selectedDate = searchParams.get('selectedDate') ?? getFormattedDate(today)

  const { data, isPending } = useQuery(queries.quiz.allRecords())
  const { solvedQuizDateList } = useUserStore()

  const groupedQuizList = solvedQuizDateList.map((dateString) => {
    const quizzes = data?.quizRecords.filter(
      (record) => record.solvedDate.split('T')[0] === dateString
    )

    return {
      dateString,
      quizzes,
    }
  })

  useEffect(() => {
    if (selectedDate) {
      const targetElement = document.getElementById(selectedDate)
      if (targetElement) {
        // 스크롤 이동
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [selectedDate, groupedQuizList])

  if (isPending) return <Loading center />

  return (
    <>
      {groupedQuizList.map((dateGroup) => (
        <div key={dateGroup.dateString} id={dateGroup.dateString} className="flex flex-col">
          <Text typography="text2-medium" color="sub" className="my-[8px]">
            {formatDateKorean(dateGroup.dateString, { year: true, month: true, day: true })}
          </Text>
          {dateGroup.quizzes?.map((record, index) => (
            <RecordItem
              key={record.quizSetId + '-' + index}
              type={record.quizSetType}
              name={record.name}
              quizCount={record.quizCount}
              score={record.score}
            />
          ))}
        </div>
      ))}
    </>
  )
}

export default AllRecordDetail
