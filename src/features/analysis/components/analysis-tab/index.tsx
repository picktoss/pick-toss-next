'use client'

import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import { useRouter, useSearchParams } from 'next/navigation'

const AnalysisTab = () => {
  const router = useRouter()
  const tab = useSearchParams().get('tab')

  return (
    <div className="w-full px-[16px] pt-[12px]">
      <Tabs
        defaultValue={tab ?? 'week'}
        className="h-[48px] w-full rounded-[12px] bg-background-base-02 p-[4px]"
        onValueChange={(value) => router.replace(`?tab=${value}`)}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="week" className="h-[40px]">
            주
          </TabsTrigger>
          <TabsTrigger value="month" className="h-[40px]">
            월
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

export default AnalysisTab
