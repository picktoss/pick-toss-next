'use client'

import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import Text from '@/shared/components/ui/text'
import { useRouter, useSearchParams } from 'next/navigation'

const WeekAndMonthTab = ({ tab }: { tab?: string }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const onChangeTab = (value: 'week' | 'month') => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', value)

    router.push(`?${params.toString()}`)
  }

  return (
    <Tabs
      defaultValue={tab ? tab : 'week'}
      className="h-[48px] w-full rounded-[12px] bg-background-base-02 p-[4px]"
      onValueChange={(value) => onChangeTab(value as 'week' | 'month')}
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="week" className="h-[40px]">
          <Text typography="button2">주</Text>
        </TabsTrigger>
        <TabsTrigger value="month" className="h-[40px]">
          <Text typography="button2">월</Text>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export default WeekAndMonthTab
