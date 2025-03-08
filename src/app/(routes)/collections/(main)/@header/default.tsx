'use client'

import { tabs } from '@/features/quiz/config'
import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { useAmplitudeContext } from '@/shared/hooks/use-amplitude-context'
import { cn } from '@/shared/lib/utils'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const Header = () => {
  const { collectionAddClickEvent } = useAmplitudeContext()
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
          <Link href="/collections/search">
            <Icon name="search" className="size-[24px]" />
          </Link>
          <Link
            href="/collections/create"
            onClick={() =>
              collectionAddClickEvent({
                option: '헤더',
              })
            }
          >
            <Icon name="write-document" className="size-[24px]" />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
