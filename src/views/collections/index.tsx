'use client'

import Exploration from './screens/exploration'
import MyCollection from './screens/my-collection'
import Icon from '@/shared/components/icon'
import { useState } from 'react'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'

const tabs = [
  { key: 'exploration', label: '탐색', component: <Exploration /> },
  { key: 'my-collection', label: '내 컬렉션', component: <MyCollection /> },
] as const

const Collections = () => {
  const [activeTab, setActiveTab] = useState<'exploration' | 'my-collection'>('my-collection')

  return (
    <div>
      <header className="h-[54px]">
        <div className="flex items-center justify-between pl-[5px] pr-[16px]">
          <div className="text-text-disabled">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="px-[12px] py-[14px]"
              >
                <Text
                  typography="title2"
                  className={cn('transition-colors', activeTab === tab.key && 'text-text-primary')}
                >
                  {tab.label}
                </Text>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-[16px]">
            <Icon name="search" className="size-[24px]" />
            <Icon name="write-note" className="size-[24px]" />
          </div>
        </div>
      </header>

      {tabs.find((tab) => tab.key === activeTab)?.component}
    </div>
  )
}

export default Collections
