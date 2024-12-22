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
import SelectMinQuizCountDrawer from './select-min-quiz-count-drawer'
import { useSearchParams } from 'next/navigation'
import { DEFAULT_COLLECTION_QUIZ_COUNT } from '../config'

const controlButtons = ['분야', '퀴즈 유형']

const Exploration = () => {
  const searchParams = useSearchParams()
  const quizType = searchParams.get('quizType')
  const minQuizCount = Number(searchParams.get('min-quiz-count')) || DEFAULT_COLLECTION_QUIZ_COUNT

  const { data: collectionsData, isLoading } = useCollections({
    collectionSortOption: 'POPULARITY',
    collectionCategory: undefined,
    quizType: undefined,
    quizCount: minQuizCount,
  })
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
          <SelectMinQuizCountDrawer count={minQuizCount} />
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
                creatorName={collection.member.creatorName}
              />
            </Link>
          ))
        )}
      </CollectionList>
    </>
  )
}

export default Exploration
