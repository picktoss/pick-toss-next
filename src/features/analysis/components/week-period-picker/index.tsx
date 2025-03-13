'use client'

import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import {
  formatToMD,
  formatToYYYYMMDD,
  getFutureDatesFromGivenDate,
  getPastDatesFromGivenDate,
  getSixDaysAgo,
} from '@/shared/utils/date'
import { useRouter, useSearchParams } from 'next/navigation'

const WeekPeriodPicker = ({ today }: { today: Date }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const startDate = searchParams.get('startDate') ?? formatToYYYYMMDD(getSixDaysAgo())
  const endDate = searchParams.get('endDate') ?? formatToYYYYMMDD(today)

  const nextBtnDisabled = endDate === formatToYYYYMMDD(today)

  const justBeforePeriod = getPastDatesFromGivenDate(startDate)
  const rightAfterPeriod = getFutureDatesFromGivenDate(endDate)

  const handlePrevPeriod = () => {
    const currentSearchParams = new URLSearchParams(searchParams)
    currentSearchParams.set('tab', 'WEEK')
    currentSearchParams.set('startDate', justBeforePeriod[0] ?? '')
    currentSearchParams.set('endDate', justBeforePeriod[1] ?? '')

    router.replace(`?${currentSearchParams.toString()}`)
  }
  const handleNextPeriod = () => {
    const currentSearchParams = new URLSearchParams(searchParams)
    currentSearchParams.set('tab', 'WEEK')
    currentSearchParams.set('startDate', rightAfterPeriod[0] ?? '')
    currentSearchParams.set('endDate', rightAfterPeriod[1] ?? '')

    router.replace(`?${currentSearchParams.toString()}`)
  }

  return (
    <div className="flex-center flex h-fit w-full px-[16px] py-[32px]">
      <button type="button" onClick={handlePrevPeriod}>
        <Icon name="triangle-left" className="size-[16px]" />
      </button>

      <Text typography="subtitle1-bold" className="mx-[16px]">
        {formatToMD(startDate)} ~ {formatToMD(endDate)}
      </Text>

      <button type="button" disabled={nextBtnDisabled} onClick={handleNextPeriod}>
        <Icon
          name="triangle-right"
          className={cn('size-[16px]', nextBtnDisabled && 'text-icon-disabled')}
        />
      </button>
    </div>
  )
}

export default WeekPeriodPicker
