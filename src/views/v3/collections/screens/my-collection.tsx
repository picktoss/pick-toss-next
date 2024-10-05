'use client'

import Text from '@/shared/components/text'
import { cn } from '@/shared/lib/utils'
import { useState } from 'react'

const tabs = [
  { key: 'create-collection', label: '만든 컬렉션' },
  { key: 'save-collection', label: '보관한 컬렉션' },
] as const

const MyCollection = () => {
  const [activeTab, setActiveTab] = useState<'create-collection' | 'save-collection'>(
    'create-collection'
  )

  return (
    <>
      <div className="flex h-[60px] border-b border-border-divider text-text-sub transition-all">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={cn(
              'flex-1',
              activeTab === tab.key && 'border-b-[2px] border-button-fill-selected'
            )}
            onClick={() => setActiveTab(tab.key)}
          >
            <Text
              typography="subtitle2-bold"
              className={cn(activeTab === tab.key && 'text-text-primary')}
            >
              {tab.label}
            </Text>
          </button>
        ))}
      </div>

      <div className="h-[calc(100dvh-88px-114px)] overflow-y-scroll bg-gray-50 px-[16px] pb-[60px] pt-[24px]">
        asd
      </div>
    </>
  )
}

export default MyCollection
