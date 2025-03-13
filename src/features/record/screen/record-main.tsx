'use client'

import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { formatToYYYYMMDD } from '@/shared/utils/date'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import ConsecutiveDays from '../components/consecutive-days'
import CustomCalendar from '../components/calendar'
import RecordList from '../components/record-list'
import { Button } from '@/shared/components/ui/button'
import Icon from '@/shared/components/custom/icon'
import Link from 'next/link'

const RecordMain = () => {
  const today = new Date()
  const searchParams = useSearchParams()
  const selectedDate = searchParams.get('selectedDate') ?? formatToYYYYMMDD(today)
  const { data: consecutiveDaysData } = useQuery(queries.quiz.consecutiveDays())
  const { data: dateRecordsData } = useQuery(queries.quiz.dateRecords(selectedDate))

  const currentConsecutiveDays = useMemo(
    () => consecutiveDaysData?.currentConsecutiveDays ?? 0,
    [consecutiveDaysData]
  )
  const maxConsecutiveDays = useMemo(
    () => consecutiveDaysData?.maxConsecutiveDays ?? 0,
    [consecutiveDaysData]
  )
  const quizRecords = useMemo(() => dateRecordsData?.quizRecords ?? [], [dateRecordsData])

  return (
    <main className="h-[calc(100dvh-54px)] overflow-y-auto px-[16px]">
      <ConsecutiveDays
        currentConsecutiveDays={currentConsecutiveDays}
        maxConsecutiveDays={maxConsecutiveDays}
      />

      <CustomCalendar className="mt-[3px]" />

      <RecordList selectedDate={selectedDate} quizRecords={quizRecords} />

      <Link href={'/record/all' + `?selectedDate=${selectedDate}`} className="size-fit">
        <Button
          variant={'smallSquare'}
          colors={'tertiary'}
          className="mb-[27px] mt-[8px] h-fit w-full py-[13.5px]"
        >
          기록 전체보기
          <Icon name="chevron-right" className="size-[16px] text-icon-tertiary" />
        </Button>
      </Link>
    </main>
  )
}

export default RecordMain
