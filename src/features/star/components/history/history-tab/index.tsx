'use client'

import { Button } from '@/shared/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'

export type StarHistoryTab = 'all' | 'payment' | 'expend' | 'reward'

const HistoryTab = () => {
  const router = useRouter()
  const tab = useSearchParams().get('tab') ?? ''
  const activeTab = ['all', 'payment', 'expend', 'reward'].includes(tab) ? tab : 'all'

  return (
    <div
      onClick={(e) => {
        const eventTarget = e.target as HTMLElement
        if (!eventTarget.id) return

        router.push(`star-history?tab=${eventTarget.id}`)
      }}
      className="flex items-center gap-[8px] px-[16px] py-[8px]"
    >
      <Button
        id="all"
        variant={'smallRound'}
        colors={activeTab === 'all' ? 'selected' : 'outlined'}
        className="py-[7.5px]"
      >
        전체
      </Button>
      <Button
        id="payment"
        variant={'smallRound'}
        colors={activeTab === 'payment' ? 'selected' : 'outlined'}
        className="py-[7.5px]"
      >
        결제
      </Button>
      <Button
        id="expend"
        variant={'smallRound'}
        colors={activeTab === 'expend' ? 'selected' : 'outlined'}
        className="py-[7.5px]"
      >
        사용
      </Button>
      <Button
        id="reward"
        variant={'smallRound'}
        colors={activeTab === 'reward' ? 'selected' : 'outlined'}
        className="py-[7.5px]"
      >
        적립
      </Button>
    </div>
  )
}

export default HistoryTab
