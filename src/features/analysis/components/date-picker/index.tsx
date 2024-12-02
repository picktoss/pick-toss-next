'use client'

import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import { formatDateKorean } from '@/shared/utils/date'
import { useRouter } from 'next/navigation'

const DatePicker = ({ date }: { date?: string }) => {
  const router = useRouter()

  const today = new Date()
  const selectedDate = date ? new Date(date) : today
  const formattedDate = formatDateKorean(selectedDate.toISOString(), { month: true, day: true })

  const todayYearMonthDate = formatDateKorean(today.toISOString(), {
    year: true,
    month: true,
    day: true,
  })
  const selectedYearMonthDate = formatDateKorean(selectedDate.toISOString(), {
    year: true,
    month: true,
    day: true,
  })

  const updateDate = (offset: number) => {
    const newDate = new Date(selectedDate)
    newDate.setDate(selectedDate.getDate() + offset)

    router.push(`?date=${newDate.toISOString().split('T')[0]}`)
  }

  return (
    <div className="flex-center mt-[12px] gap-[16px]">
      <button className="size-[16px]" onClick={() => updateDate(-1)}>
        <Icon name="triangle-left" />
      </button>

      <Text typography="subtitle2-medium">{formattedDate}</Text>

      <button
        className={cn(
          'size-[16px]',
          todayYearMonthDate === selectedYearMonthDate && 'pointer-events-none text-icon-disabled'
        )}
        onClick={() => updateDate(1)}
      >
        <Icon name="triangle-right" />
      </button>
    </div>
  )
}

export default DatePicker
