'use client'

import PickDrawer from '@/features/quiz/components/pick-drawer'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'

const tabs = [
  { key: 'document-content', label: '노트' },
  { key: 'quiz', label: '퀴즈' },
] as const

const DocumentDetailController = () => {
  const router = useRouter()
  const tab = useSearchParams().get('tab') ?? ''
  const activeTab = ['document-content', 'quiz'].includes(tab) ? tab : 'document-content'

  const handleTabChange = (newTab: 'document-content' | 'quiz') => {
    if (newTab !== activeTab) {
      router.replace(`?tab=${newTab}`)
    }
  }

  return (
    <div className="sticky top-[54px]">
      <div className="flex items-center justify-between bg-background-base-01 text-text-disabled">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            className={cn(
              'grow px-[16px] pb-[12px] mt-[12px] border-b border-border-divider flex-center',
              activeTab === tab.key && 'border-b-2 border-button-fill-selected'
            )}
          >
            <Text
              typography="subtitle2-medium"
              className={cn(
                'transition-colors',
                activeTab === tab.key && 'text-text-primary font-bold'
              )}
            >
              {tab.label}
            </Text>
          </button>
        ))}
      </div>

      <PickDrawer />
    </div>
  )
}

export default DocumentDetailController
