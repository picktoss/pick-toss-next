'use client'

import { Calendar } from '@/shared/components/ui/calendar'
import { cn } from '@/shared/lib/utils'
import { getFormattedDate } from '@/shared/utils/date'
import { useUserStore } from '@/store/user'
import { format } from 'date-fns'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo } from 'react'

interface Props {
  className?: HTMLElement['className']
  userQuizRecords: Quiz.Response.GetQuizRecords['quizRecords']
}

const CustomCalendar = ({ className, userQuizRecords }: Props) => {
  const today = useMemo(() => new Date(), [])

  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedDateString = searchParams.get('selectedDate')

  const { setSolvedQuizDateList } = useUserStore()

  const selectedDate = useMemo(() => {
    if (selectedDateString) {
      const [year, month, day] = selectedDateString.split('-').map(Number)
      return new Date(year!, month! - 1, day)
    }
    return today
  }, [selectedDateString, today])

  const userSolvedDateList = useMemo(() => {
    const dateListSet = new Set<string>()

    userQuizRecords.map((record) => {
      const dateString = record.solvedDate.split('T')[0] ?? ''
      dateListSet.add(dateString)
    })

    const sortedDateList = Array.from(dateListSet).sort((a, b) => {
      return new Date(a).getTime() - new Date(b).getTime()
    })

    return sortedDateList
  }, [userQuizRecords])

  useEffect(() => {
    setSolvedQuizDateList(userSolvedDateList)
  }, [setSolvedQuizDateList, userSolvedDateList])

  const handleSelect = (selected?: Date) => {
    if (selected) {
      const formattedDate = getFormattedDate(selected)

      router.replace(`?selectedDate=${formattedDate}`)
    }
  }

  return (
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
      selectedMonth={selectedDate}
    />
  )
}

export default CustomCalendar
