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

  return (
    <div className="flex-center flex h-fit w-full px-[16px] py-[32px]">
      <button
        type="button"
        onClick={() =>
          router.replace(
            `?tab=WEEK&startDate=${justBeforePeriod[0]}&endDate=${justBeforePeriod[1]}`
          )
        }
      >
        <Icon name="triangle-left" className="size-[16px]" />
      </button>

      <Text typography="subtitle1-bold" className="mx-[16px]">
        {formatToMD(startDate)} ~ {formatToMD(endDate)}
      </Text>

      <button
        type="button"
        disabled={nextBtnDisabled}
        onClick={() =>
          router.replace(
            `?tab=WEEK&startDate=${rightAfterPeriod[0]}&endDate=${rightAfterPeriod[1]}`
          )
        }
      >
        <Icon
          name="triangle-right"
          className={cn('size-[16px]', nextBtnDisabled && 'text-icon-disabled')}
        />
      </button>
    </div>
  )
}

export default WeekPeriodPicker
