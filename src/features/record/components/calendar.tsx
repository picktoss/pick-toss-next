'use client'

import Loading from '@/shared/components/custom/loading'
import { Calendar } from '@/shared/components/ui/calendar'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { cn } from '@/shared/lib/utils'
import { formatToYYYYMMDD } from '@/shared/utils/date'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

interface Props {
  className?: HTMLElement['className']
}

const CustomCalendar = ({ className }: Props) => {
  const today = useMemo(() => new Date(), [])

  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedDateString = searchParams.get('selectedDate') ?? formatToYYYYMMDD(today)

  const selectedDate = useMemo(() => {
    if (selectedDateString) {
      const [year, month, day] = selectedDateString.split('-').map(Number)
      return new Date(year!, month! - 1, day)
    }
    return today
  }, [selectedDateString, today])

  const [showLoading, setShowLoading] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(selectedDate) // 📌 현재 달을 추적

  const { data, isPending } = useQuery(
    queries.quiz.recordsConsecutiveDays(formatToYYYYMMDD(currentMonth))
  )

  useEffect(() => {
    setShowLoading(false)
  }, [selectedDateString])

  const handleSelect = (selected?: Date) => {
    setShowLoading(true)

    if (selected) {
      const formattedDate = formatToYYYYMMDD(selected)

      if (selectedDateString === formattedDate) {
        setShowLoading(false)
        return
      }

      router.replace(`?selectedDate=${formattedDate}`)
    }
  }

  return (
    <div className="relative w-full">
      {(showLoading || isPending) && (
        <div className="absolute right-1/2 top-0 z-50 h-[316px] w-[398px] translate-x-1/2">
          <div className="size-full bg-white opacity-50" />
          <Loading center />
        </div>
      )}

      <Calendar
        required
        today={today}
        mode="single"
        formatters={{
          formatCaption: (Date: Date) => `${format(Date, 'M')}월`,
          formatWeekdayName: (Date: Date) => {
            const weekdays = ['일', '월', '화', '수', '목', '금', '토']
            return weekdays[Date.getDay()]
          },
        }}
        className={cn('w-full', className)}
        selected={selectedDate}
        onSelect={(date?: Date) => handleSelect(date)}
        selectedMonth={currentMonth} // 📌 현재 선택된 월
        onMonthChange={(month) => setCurrentMonth(month)} // 📌 월 변경 감지
        solvedQuizDateRecords={data?.solvedQuizDateRecords}
      />
    </div>
  )
}

export default CustomCalendar
