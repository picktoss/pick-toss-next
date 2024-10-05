'use client'

import Exploration from './screens/exploration'
import MyCollection from './screens/my-collection'
import Icon from '@/shared/components/v3/icon'
import { useState } from 'react'
import Text from '@/shared/components/text'
import { cn } from '@/shared/lib/utils'

const Collections = () => {
  const [tab, setTab] = useState<'exploration' | 'my-collection'>('exploration')

  return (
    <div>
      <header className="h-[54px]">
        <div className="flex items-center justify-between pl-[5px] pr-[16px]">
          <div className="text-text-disabled">
            <button onClick={() => setTab('exploration')} className="px-[12px] py-[14px]">
              <Text
                typography="title2"
                className={cn('transition-colors', tab === 'exploration' && 'text-text-primary')}
              >
                탐색
              </Text>
            </button>
            <button onClick={() => setTab('my-collection')} className="px-[12px] py-[14px]">
              <Text
                typography="title2"
                className={cn('transition-colors', tab === 'my-collection' && 'text-text-primary')}
              >
                내 컬렉션
              </Text>
            </button>
          </div>
          <div className="flex items-center gap-[16px]">
            <Icon name="search" className="size-[24px]" />
            <Icon name="write-note" className="size-[24px]" />
          </div>
        </div>
      </header>

      {tab === 'exploration' ? <Exploration /> : <MyCollection />}
    </div>
  )
}

export default Collections
