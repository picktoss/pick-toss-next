/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { Calendar } from '@/shared/components/ui/calendar'
import { getFormattedDate } from '@/shared/utils/date'
import { format } from 'date-fns'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

const CustomCalendar = () => {
  const today = useMemo(() => new Date(), [])

  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedDateString = searchParams.get('selectedDate')

  const selectedDate = useMemo(() => {
    if (selectedDateString) {
      const [year, month, day] = selectedDateString.split('-').map(Number)
      return new Date(year!, month! - 1, day)
    }
    return today
  }, [selectedDateString, today])

  const handleSelect = (selected?: Date) => {
    if (selected) {
      const formattedDate = getFormattedDate(selected)

      router.replace(`?selectedDate=${formattedDate}`)
    }
  }

  return (
    <div>
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
        className="w-full"
        selected={selectedDate}
        onSelect={(date?: Date) => handleSelect(date)}
        selectedMonth={selectedDate}
        // fromDate={}
      />
    </div>
  )
}

export default CustomCalendar
