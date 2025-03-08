'use client'

import Text from '@/shared/components/ui/text'
import { useAmplitudeContext } from '@/shared/hooks/use-amplitude-context'
import { cn } from '@/shared/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'

const tabs = [
  { key: 'DOCUMENT_CONTENT', label: '노트' },
  { key: 'QUIZ', label: '퀴즈' },
] as const

const DocumentDetailController = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') ?? ''
  const activeTab = ['DOCUMENT_CONTENT', 'QUIZ'].includes(tab) ? tab : 'DOCUMENT_CONTENT'

  const { quizTabClickEvent, noteTabClickEvent } = useAmplitudeContext()

  const handleTabChange = (newTab: 'DOCUMENT_CONTENT' | 'QUIZ') => {
    if (newTab !== activeTab) {
      if (newTab === 'DOCUMENT_CONTENT') {
        noteTabClickEvent()
      } else if (newTab === 'QUIZ') {
        quizTabClickEvent()
      }

      const currentSearchParams = new URLSearchParams(searchParams)
      currentSearchParams.set('tab', newTab)
      router.replace(`?${currentSearchParams.toString()}`)
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
    </div>
  )
}

export default DocumentDetailController
