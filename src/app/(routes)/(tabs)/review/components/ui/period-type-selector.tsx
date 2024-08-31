'use client'

import useAmplitudeContext from '@/shared/hooks/use-amplitude-context'
import { cn } from '@/shared/lib/utils'

interface Props {
  periodType: 'week' | 'month'
  selectWeek: () => void
  selectMonth: () => void
}

export function PeriodTypeSelector({ periodType, selectWeek, selectMonth }: Props) {
  const { clickedEvent } = useAmplitudeContext()

  return (
    <div className="absolute right-[20px] top-[16px] flex gap-[6px] text-text-bold *:rounded-[16px] *:px-[12px] *:py-[4px] lg:right-[30px] lg:top-[66px]">
      <div
        role="button"
        className={cn(periodType === 'week' ? 'bg-blue-04 text-white' : 'bg-gray-02 text-gray-07')}
        onClick={() => {
          selectWeek()
          clickedEvent({
            buttonType: 'quizAnalysis',
            buttonName: `${periodType}_button`,
          })
        }}
      >
        주
      </div>
      <div
        role="button"
        className={cn(periodType === 'month' ? 'bg-blue-04 text-white' : 'bg-gray-02 text-gray-07')}
        onClick={() => {
          selectMonth()
          clickedEvent({
            buttonType: 'quizAnalysis',
            buttonName: `${periodType}_button`,
          })
        }}
      >
        월
      </div>
    </div>
  )
}
