import { formatDateKorean } from '@/utils/date'

interface Props {
  periodType: 'week' | 'month'
  weekDates: string[]
  month: number
}

export function Period({ periodType, weekDates, month }: Props) {
  return (
    <div className="text-center text-h4-bold text-gray-08 lg:text-h3-bold">
      {periodType === 'week'
        ? `${formatDateKorean(weekDates[0], {
            month: true,
            day: true,
          })}~${formatDateKorean(weekDates[weekDates.length - 1], {
            month: true,
            day: true,
          })}`
        : `${month}월`}
    </div>
  )
}
