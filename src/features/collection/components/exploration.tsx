'use client'

import Icon from '@/shared/components/custom/icon'
import Collection from './collection'
import CollectionList from './collection-list'
import Text from '@/shared/components/ui/text'
import { useCollections } from '@/requests/collection/hooks'
import Loading from '@/shared/components/custom/loading'
import { useUser } from '@/shared/hooks/use-user'
import Link from 'next/link'
import { useScrollPosition } from '@/shared/hooks/use-scroll-position'

const controlButtons = ['분야', '퀴즈 유형', '문제 수']

const Exploration = () => {
  const { data: collectionsData, isLoading } = useCollections()
  const { user } = useUser()

  const scrollContainerRef = useScrollPosition({ pageKey: 'exploration' })

  return (
    <>
      <div className="flex h-[60px] items-center justify-between px-[16px]">
        <div className="flex gap-[8px]">
          {controlButtons.map((button) => (
            <button
              key={button}
              className="flex items-center gap-[4px] rounded-full border bg-button-fill-outlined py-[7.5px] pl-[14px] pr-[10px]"
            >
              <Text typography="button4" className="text-button-label-tertiary">
                {button}
              </Text>
              <Icon name="chevron-down" className="size-[12px] text-icon-tertiary" />
            </button>
          ))}
        </div>
        <Icon name="sort" className="size-[16px]" />
      </div>

      <CollectionList ref={scrollContainerRef}>
        {isLoading ? (
          <Loading center />
        ) : (
          collectionsData?.collections.map((collection) => (
            <Link key={collection.id} href={`/collections/${collection.id}`}>
              <Collection
                collectionId={collection.id}
                emoji={collection.emoji}
                title={collection.name}
                category={collection.collectionCategory}
                problemCount={0}
                lastUpdated="2일 전"
                isOwner={user?.id === collection.member.creatorId}
                isBookMarked={collection.bookmarked}
                bookMarkCount={collection.bookmarkCount}
              />
            </Link>
          ))
        )}
      </CollectionList>
    </>
  )
}

export default Exploration
