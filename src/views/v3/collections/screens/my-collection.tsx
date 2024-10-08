'use client'

import Text from '@/shared/components/text'
import { cn } from '@/shared/lib/utils'
import { useState } from 'react'
import Collection from '../components/collection'
import CollectionList from '../components/collection-list'
import Link from 'next/link'
import Icon from '@/shared/components/v3/icon'

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

      <CollectionList>
        {activeTab === 'create-collection' && (
          <Link
            href="#"
            className="flex flex-col items-center gap-[12px] rounded-[16px] border-[3px] border-dashed border-border-default pt-[70px]"
          >
            <Icon name="plus-circle" className="size-[24px]" />
            <Text typography="subtitle2-bold">만들기</Text>
          </Link>
        )}
        {Array.from({ length: 10 }).map((_, idx) => (
          <Collection
            key={idx}
            emoji="🔥"
            title="파이썬 OX"
            category="IT·프로그래밍"
            problemCount={35}
            lastUpdated="2일 전"
            href="#"
            isBookMarked={true}
            bookMarkCount={123}
          />
        ))}
      </CollectionList>
    </>
  )
}

export default MyCollection
