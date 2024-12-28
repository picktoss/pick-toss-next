'use client'

import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import { SearchTab } from '../screens/integrated-search'

const tabs = [
  { key: 'all', label: '전체' },
  { key: 'quiz-note', label: '퀴즈노트' },
  { key: 'collection', label: '컬렉션' },
] as const

const SearchTabController = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') || ('all' as SearchTab)
  const keyword = searchParams.get('keyword')
  const activeTab = ['all', 'quiz-note', 'collection'].includes(tab) ? tab : 'all'

  const handleTabChange = (newTab: SearchTab) => {
    if (newTab !== activeTab) {
      keyword
        ? router.replace(`?tab=${newTab}` + `&keyword=${keyword}`)
        : router.replace(`?tab=${newTab}`)
    }
  }

  return (
    <div className="sticky top-[54px] flex items-center justify-between bg-background-base-01 text-text-disabled">
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
  )
}

export default SearchTabController
