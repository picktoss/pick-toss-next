'use client'

import Collection from './collection'
import CollectionList from './collection-list'
import { useCollections } from '@/requests/collection/hooks'
import Loading from '@/shared/components/custom/loading'
import { useUser } from '@/shared/hooks/use-user'
import Link from 'next/link'
import { useScrollPosition } from '@/shared/hooks/use-scroll-position'
import SelectMinQuizCountDrawer from './select-min-quiz-count-drawer'
import { useSearchParams } from 'next/navigation'
import { DEFAULT_COLLECTION_QUIZ_COUNT } from '../config'
import SelectQuizTypeDrawer from './select-quiz-type-drawer'
import SelectCategoryDrawer from './select-category-drawer'
import { SortCollectionDropdown } from './sort-collection-dropdown'
import { useState } from 'react'
import CollectionBannerAd from '@/features/advertisement/components/collection-banner-ad'

const Exploration = () => {
  const searchParams = useSearchParams()
  const categories = searchParams.getAll('collection-category') as Collection.Field[]
  const quizType = searchParams.get('quiz-type') as Quiz.Type
  const minQuizCount = Number(searchParams.get('min-quiz-count')) || DEFAULT_COLLECTION_QUIZ_COUNT
  const [sortOption, setSortOption] = useState<'POPULARITY' | 'UPDATED'>('POPULARITY')

  const { data: collectionsData, isLoading } = useCollections({
    collectionSortOption: sortOption,
    collectionCategories: categories,
    quizType,
    quizCount: minQuizCount,
  })
  const { user } = useUser()

  const scrollContainerRef = useScrollPosition({ pageKey: 'exploration' })

  // 컬렉션 데이터를 렌더링하면서 6개(3행)마다 광고 컴포넌트를 삽입
  const renderCollectionsWithAds = () => {
    const items: React.ReactNode[] = []
    const collections = collectionsData?.collections || []

    collections.forEach((collection, index) => {
      items.push(
        <Link key={collection.id} href={`/collections/${collection.id}`}>
          <Collection
            collectionId={collection.id}
            emoji={collection.emoji}
            title={collection.name}
            category={collection.collectionCategory}
            problemCount={collection.totalQuizCount}
            lastUpdated="2일 전"
            isOwner={user?.id === collection.member.creatorId}
            isBookMarked={collection.bookmarked}
            bookMarkCount={collection.bookmarkCount}
            creatorName={collection.member.creatorName}
          />
        </Link>
      )

      // 6번째(인덱스 5, 11, 17 등) 항목 후에 광고 삽입 (마지막 그룹이 아닐 경우)
      if ((index + 1) % 6 === 0 && index !== collections.length - 1) {
        items.push(
          <div key={`ad-${index}`} className="col-span-2 mx-auto">
            <CollectionBannerAd />
          </div>
        )
      }
    })

    return items
  }

  return (
    <>
      <div className="flex h-[60px] items-center justify-between px-[16px]">
        <div className="flex gap-[8px]">
          <SelectCategoryDrawer categories={categories} />
          <SelectQuizTypeDrawer quizType={quizType} />
          <SelectMinQuizCountDrawer count={minQuizCount} />
        </div>
        <SortCollectionDropdown
          sort={(option: 'POPULARITY' | 'UPDATED') => setSortOption(option)}
        />
      </div>

      <CollectionList ref={scrollContainerRef}>
        {isLoading ? <Loading center /> : renderCollectionsWithAds()}
      </CollectionList>
    </>
  )
}

export default Exploration
