'use client'

import { Calendar } from '@/shared/components/ui/calendar'
import { cn } from '@/shared/lib/utils'
import { getFormattedDate } from '@/shared/utils/date'
import { format } from 'date-fns'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

interface Props {
  className?: HTMLElement['className']
}

const CustomCalendar = ({ className }: Props) => {
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
