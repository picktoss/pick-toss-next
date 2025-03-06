'use client'

import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import { formatToYYYYMM, getNextMonth, getPreviousMonth } from '@/shared/utils/date'
import { useRouter, useSearchParams } from 'next/navigation'

const MonthPeriodPicker = ({ today }: { today: Date }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedMonth = searchParams.get('month') ?? formatToYYYYMM(today)

  const nextBtnDisabled = selectedMonth === formatToYYYYMM(today)

  const justBeforeMonth = getPreviousMonth(selectedMonth)
  const rightAfterMonth = getNextMonth(selectedMonth)

  return (
    <div className="flex-center flex h-fit w-full px-[16px] py-[32px]">
      <button type="button" onClick={() => router.replace(`?tab=MONTH&month=${justBeforeMonth}`)}>
        <Icon name="triangle-left" className="size-[16px]" />
      </button>

      <Text typography="subtitle1-bold" className="mx-[16px]">
        {Number(selectedMonth.split('-')[1])}월
      </Text>

      <button
        type="button"
        disabled={nextBtnDisabled}
        onClick={() => router.replace(`?tab=MONTH&month=${rightAfterMonth}`)}
      >
        <Icon
          name="triangle-right"
          className={cn('size-[16px]', nextBtnDisabled && 'text-icon-disabled')}
        />
      </button>
    </div>
  )
}

export default MonthPeriodPicker
