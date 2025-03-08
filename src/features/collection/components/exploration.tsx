'use client'

import Collection from './collection'
import CollectionList from './collection-list'
import { useCollections } from '@/requests/collection/hooks'
import Loading from '@/shared/components/custom/loading'
import { useUser } from '@/shared/hooks/use-user'
import Link from 'next/link'
import { useScrollPosition } from '@/shared/hooks/use-scroll-position'
import SelectMinQuizCountDrawer from './select-min-quiz-count-drawer'
import { useRouter, useSearchParams } from 'next/navigation'
import { DEFAULT_COLLECTION_QUIZ_COUNT } from '../config'
import SelectQuizTypeDrawer from './select-quiz-type-drawer'
import SelectCategoryDrawer from './select-category-drawer'
import { SortCollectionDropdown } from './sort-collection-dropdown'
import { useState } from 'react'
import CollectionBannerAd from '@/features/advertisement/components/collection-banner-ad'
import Text from '@/shared/components/ui/text'
import { Button } from '@/shared/components/ui/button'
import { AD_ID } from '@/features/advertisement/config'

const Exploration = () => {
  const router = useRouter()
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

      // 8번째(인덱스 7, 15, 23 등) 항목 후에 광고 삽입 (마지막 그룹이 아닐 경우)
      if ((index + 1) % 8 === 0 && index !== collections.length - 1) {
        items.push(
          <div key={`ad-${index}`} className="col-span-2 mx-auto">
            <CollectionBannerAd
              adId={AD_ID[`COLLECTION${index + 1}` as keyof typeof AD_ID] ?? ''}
            />
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
          <SelectCategoryDrawer key={JSON.stringify(categories)} categories={categories} />
          <SelectQuizTypeDrawer key={quizType} quizType={quizType} />
          <SelectMinQuizCountDrawer key={minQuizCount} count={minQuizCount} />
        </div>
        <SortCollectionDropdown
          sort={(option: 'POPULARITY' | 'UPDATED') => setSortOption(option)}
        />
      </div>

      <CollectionList ref={scrollContainerRef}>
        {isLoading ? (
          <Loading center />
        ) : collectionsData?.collections.length ? (
          renderCollectionsWithAds()
        ) : (
          <div className="center flex w-full max-w-mobile flex-col items-center gap-6">
            <div>
              <Text typography="subtitle1-bold" className="text-center">
                설정한 조건에 맞는 컬렉션이 없어요
              </Text>
              <Text
                typography="subtitle2-medium"
                color="sub"
                className="mt-1 text-center text-[14px]"
              >
                필터를 조정하거나 초기화 해보세요
              </Text>
            </div>
            <Button
              variant="mediumRound"
              colors="tertiary"
              onClick={() => {
                router.replace('/collections')
              }}
            >
              필터 초기화하기
            </Button>
          </div>
        )}
      </CollectionList>
    </>
  )
}

export default Exploration
