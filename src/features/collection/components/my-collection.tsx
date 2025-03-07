'use client'

import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import Collection from './collection'
import CollectionList from './collection-list'
import Link from 'next/link'
import Icon from '@/shared/components/custom/icon'
import { useBookmarkedCollections, useMyCollections } from '@/requests/collection/hooks'
import Loading from '@/shared/components/custom/loading'
import { SwitchCase } from '@/shared/components/custom/react/switch-case'
import { useRouter, useSearchParams } from 'next/navigation'
import { useScrollPosition } from '@/shared/hooks/use-scroll-position'

const sort = [
  { key: 'create-collection', label: '만든 컬렉션' },
  { key: 'save-collection', label: '보관한 컬렉션' },
] as const

type TabType = (typeof sort)[number]['key']

const MyCollection = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeTab = (searchParams.get('sort') as TabType) || 'create-collection'

  const scrollContainerRef = useScrollPosition({ pageKey: 'my-collection' })

  const { data: myCollectionsData, isLoading: isMyCollectionLoading } = useMyCollections()
  const { data: bookmarkedCollectionsData, isLoading: isBookmarkedCollectionLoading } =
    useBookmarkedCollections()

  const handleTabChange = (tab: TabType) => {
    const params = new URLSearchParams(searchParams as unknown as URLSearchParams)
    params.set('sort', tab)
    router.replace(`?${params.toString()}`)
  }

  return (
    <>
      <div className="flex h-[54px] border-b border-border-divider text-text-sub transition-all">
        {sort.map((tab) => (
          <button
            key={tab.key}
            className={cn(
              'flex-1',
              activeTab === tab.key && 'border-b-[2px] py-3 border-button-fill-selected'
            )}
            onClick={() => handleTabChange(tab.key)}
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

      <SwitchCase
        value={activeTab}
        caseBy={{
          'create-collection': isMyCollectionLoading ? (
            <Loading center />
          ) : (
            <CollectionList ref={scrollContainerRef}>
              <Link
                href="/collections/create"
                className="flex-center h-[200px] min-w-[166px] flex-col items-center gap-[12px] rounded-[16px] border-[3px] border-dashed border-border-default"
              >
                <Icon name="plus-circle" className="size-[24px]" />
                <Text typography="subtitle2-bold">만들기</Text>
              </Link>
              {myCollectionsData?.collections.map((collection) => (
                <Link key={collection.id} href={`/collections/${collection.id}`}>
                  <Collection
                    collectionId={collection.id}
                    emoji={collection.emoji}
                    title={collection.name}
                    category={collection.collectionCategory}
                    problemCount={collection.totalQuizCount}
                    lastUpdated="2일 전"
                    isOwner={true}
                    bookMarkCount={collection.bookmarkCount}
                    creatorName={collection.member.creatorName}
                  />
                </Link>
              ))}
            </CollectionList>
          ),
          'save-collection': isBookmarkedCollectionLoading ? (
            <Loading center />
          ) : (
            <CollectionList ref={scrollContainerRef}>
              {bookmarkedCollectionsData?.collections.map((collection) => (
                <Link key={collection.id} href={`/collections/${collection.id}`}>
                  <Collection
                    collectionId={collection.id}
                    emoji={collection.emoji}
                    title={collection.name}
                    category={collection.collectionCategory}
                    problemCount={collection.totalQuizCount}
                    lastUpdated="2일 전"
                    isBookMarked={collection.bookmarked}
                    bookMarkCount={collection.bookmarkCount}
                    creatorName={collection.member.creatorName}
                  />
                </Link>
              ))}
            </CollectionList>
          ),
        }}
      />
    </>
  )
}

export default MyCollection
