'use client'

import Loading from '@/shared/components/custom/loading'
import { Calendar } from '@/shared/components/ui/calendar'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { cn } from '@/shared/lib/utils'
import { formatToYYYYMMDD } from '@/shared/utils/date'
import { useQuery } from '@tanstack/react-query'
import { addDays, format, isSameDay, parseISO, startOfDay } from 'date-fns'
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
  const [currentMonth, setCurrentMonth] = useState(selectedDate)

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

      const currentSearchParams = new URLSearchParams(searchParams)
      currentSearchParams.set('selectedDate', formattedDate)
      router.replace(`?${currentSearchParams.toString()}`)
    }
  }

  const modifiers = useMemo(() => {
    const defaultDate = today

    if (data?.solvedQuizDateRecords) {
      const solvedDates = data.solvedQuizDateRecords
        .filter((record) => record.isSolved)
        .map((record) => startOfDay(parseISO(record.date)))

      const ranges: { start: Date; end: Date }[] = []
      let start: Date | null = null

      for (let i = 0; i < solvedDates.length; i++) {
        if (!start) start = solvedDates[i] ?? defaultDate // 시작점 저장

        // 다음 날짜가 현재 날짜 +1 이 아니라면, 범위 종료
        if (
          i === solvedDates.length - 1 ||
          addDays(solvedDates[i] ?? defaultDate, 1).getTime() !== solvedDates[i + 1]?.getTime()
        ) {
          ranges.push({ start: start, end: solvedDates[i] ?? defaultDate })
          start = null
        }
      }

      const singleSolvedDates = solvedDates.filter((date, index, arr) => {
        const prevDate = index > 0 ? arr[index - 1] : null
        const nextDate = index < arr.length - 1 ? arr[index + 1] : null

        const hasPrev = prevDate && isSameDay(addDays(prevDate, 1), date)
        const hasNext = nextDate && isSameDay(addDays(date, 1), nextDate)

        return !hasPrev && !hasNext
      })

      const filteredRanges = ranges.filter(
        ({ start, end }) =>
          !singleSolvedDates.some((date) => isSameDay(date, start) || isSameDay(date, end))
      )

      return {
        day_range_start: filteredRanges.map((range) => startOfDay(range.start)),
        day_range_end: filteredRanges.map((range) => startOfDay(range.end)),
        day_range_middle: solvedDates.filter(
          (date) =>
            !filteredRanges.some(
              ({ start, end }) =>
                isSameDay(startOfDay(date), startOfDay(start)) ||
                isSameDay(startOfDay(date), startOfDay(end))
            ) && !singleSolvedDates.includes(date)
        ),
        single_solved_day: singleSolvedDates,
      }
    }
  }, [today, data])

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
        selectedMonth={currentMonth}
        onMonthChange={(month) => setCurrentMonth(month)}
        modifiers={modifiers}
      />
    </div>
  )
}

export default CustomCalendar
