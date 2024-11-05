'use client'

import { tabs } from '@/features/quiz/config'
import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const Header = () => {
  const tab = useSearchParams().get('tab') ?? ''
  const activeTab = ['exploration', 'my-collection'].includes(tab) ? tab : 'exploration'

  return (
    <header className="h-[54px]">
      <div className="flex items-center justify-between pl-[5px] pr-[16px]">
        <div className="flex text-text-disabled">
          {tabs.map((tab) => (
            <Link
              key={tab.key}
              href={`/collections?tab=${tab.key}`}
              replace
              className="px-[12px] py-[14px]"
            >
              <Text
                typography="title2"
                className={cn('transition-colors', activeTab === tab.key && 'text-text-primary')}
              >
                {tab.label}
              </Text>
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-[16px]">
          <Icon name="search" className="size-[24px]" />
          <Icon name="write-note" className="size-[24px]" />
        </div>
      </div>
    </header>
  )
}

export default Header
