'use client'

import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import Text from '@/shared/components/ui/text'
import { useRouter, useSearchParams } from 'next/navigation'

const AnalysisTab = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tab = useSearchParams().get('tab') ?? 'WEEK'

  const handleChangeTab = (tab: string) => {
    const currentSearchParams = new URLSearchParams(searchParams)
    currentSearchParams.set('tab', tab)

    router.replace(`?${currentSearchParams.toString()}`)
  }

  return (
    <div className="w-full px-[16px] pt-[12px]">
      <Tabs
        defaultValue={tab}
        className="h-[48px] w-full rounded-[12px] bg-background-base-02 p-[4px]"
        onValueChange={handleChangeTab}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="WEEK" className="h-[40px]">
            <Text typography="button2">주</Text>
          </TabsTrigger>
          <TabsTrigger value="MONTH" className="h-[40px]">
            <Text typography="button2">월</Text>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

export default AnalysisTab
