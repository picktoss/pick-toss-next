'use client'

import { Button } from '@/shared/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'

export type NotificationTab = 'all' | 'quiz' | 'general'

const NotificationTab = () => {
  const router = useRouter()
  const tab = useSearchParams().get('tab') ?? ''
  const activeTab = ['all', 'quiz', 'general'].includes(tab) ? tab : 'all'

  return (
    <div
      onClick={(e) => {
        const eventTarget = e.target as HTMLElement
        if (!eventTarget.id) return

        router.replace(`notification?tab=${eventTarget.id}`)
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
        id="quiz"
        variant={'smallRound'}
        colors={activeTab === 'quiz' ? 'selected' : 'outlined'}
        className="py-[7.5px]"
      >
        퀴즈
      </Button>
      <Button
        id="general"
        variant={'smallRound'}
        colors={activeTab === 'general' ? 'selected' : 'outlined'}
        className="py-[7.5px]"
      >
        일반
      </Button>
    </div>
  )
}

export default NotificationTab
