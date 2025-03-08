'use client'

import SwipeableCardList from '@/shared/components/custom/swipeable-card-list'
import Text from '@/shared/components/ui/text'
import Link from 'next/link'
import { Button } from '@/shared/components/ui/button'
import SetInterestedCategoryDrawer from '@/features/category/components/set-interested-category-drawer'
import Collection from '../collection'
import { useUserStore } from '@/store/user'
import { useQuery } from '@tanstack/react-query'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { useMemo } from 'react'
import { useAmplitudeContext } from '@/shared/hooks/use-amplitude-context'

interface Props {
  interestedCategories?: string[]
}

// 메인페이지의 유저 관심분야 컬렉션
const InterestedCategoryCollections = ({ interestedCategories }: Props) => {
  const { interestItemClickEvent, interestItemMoreClickEvent } = useAmplitudeContext()
  const { userInfo } = useUserStore()
  const { data } = useQuery(queries.collection.interestedCategory())

  const noInterests = useMemo(
    () => !interestedCategories || interestedCategories.length === 0,
    [interestedCategories]
  )
  const hasCollectionResults = useMemo(
    () => interestedCategories && data && data.collections.length > 0,
    [interestedCategories, data]
  )

  return (
    <div className="flex w-full flex-col">
      <div className="mb-[20px] flex items-center justify-between">
        <Text typography="title3">{userInfo?.name}님의 관심분야 컬렉션</Text>
        {interestedCategories && (
          <Link
            href={`/collections?collection-category=${interestedCategories.join(',')}`}
            onClick={() => interestItemMoreClickEvent()}
          >
            <Text typography="text1-medium" color="sub">
              더보기
            </Text>
          </Link>
        )}
      </div>

      {noInterests ? (
        <div className="flex-center flex-col gap-[20px] pb-[81px] pt-[76px]">
          <Text typography="text1-medium" color="sub">
            내가 좋아할만한 퀴즈를 보고 싶다면?
          </Text>
          <SetInterestedCategoryDrawer
            triggerComponent={<Button variant={'mediumRound'}>관심분야 설정하기</Button>}
          />
        </div>
      ) : data && hasCollectionResults ? (
        <SwipeableCardList
          cardComponents={data.collections.map((item) => (
            <Link
              href={`/collections/${item.id}`}
              key={item.id}
              onClick={() => interestItemClickEvent()}
            >
              <Collection
                collectionId={item.id}
                emoji={item.emoji}
                title={item.name}
                category={item.collectionCategory}
                problemCount={item.totalQuizCount}
                bookMarkCount={item.bookmarkCount}
                creatorName={item.member.creatorName}
                isBookMarked={item.bookmarked}
                isOwner={item.member.creatorId === userInfo?.id}
              />
            </Link>
          ))}
        />
      ) : (
        <div className="flex-center pb-[81px] pt-[76px]">
          <Text typography="text1-medium" color="sub">
            아직 컬렉션이 없어요
          </Text>
        </div>
      )}
    </div>
  )
}

export default InterestedCategoryCollections
