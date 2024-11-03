import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import Exploration from '@/features/collection/components/exploration'
import MyCollection from '@/features/collection/components/my-collection'
import Link from 'next/link'

interface Props {
  searchParams: {
    tab: 'exploration' | 'my-collection'
  }
}

const tabs = [
  { key: 'exploration', label: '탐색', component: <Exploration /> },
  { key: 'my-collection', label: '내 컬렉션', component: <MyCollection /> },
] as const

const CollectionsPage = ({ searchParams }: Props) => {
  const tab = searchParams.tab
  const activeTab = ['exploration', 'my-collection'].includes(tab) ? tab : 'exploration'

  return (
    <div>
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

      {tabs.find((tab) => tab.key === activeTab)?.component}
    </div>
  )
}

export default CollectionsPage
