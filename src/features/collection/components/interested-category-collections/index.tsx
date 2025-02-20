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

interface Props {
  interestedCategories?: string[]
}

// 메인페이지의 유저 관심분야 컬렉션
const InterestedCategoryCollections = ({ interestedCategories }: Props) => {
  const { userInfo } = useUserStore()
  const { data } = useQuery(queries.collection.interestedCategory())

  return (
    <div className="flex w-full flex-col">
      <div className="mb-[20px] flex items-center justify-between">
        <Text typography="title3">{userInfo?.name}님의 관심분야 컬렉션</Text>
        {interestedCategories && (
          // 더보기 클릭 - '분야'필터에 관심분야 설정된 상태의 컬렉션 gnb로 이동
          <Link href={`/collections?collection-category=${interestedCategories.join('%2C')}`}>
            <Text typography="text1-medium" color="sub">
              더보기
            </Text>
          </Link>
        )}
      </div>

      {interestedCategories && data ? (
        <SwipeableCardList
          cardComponents={data.collections.map((item) => (
            <Link href={`/collections/${item.id}`} key={item.id}>
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
        <div className="flex-center flex-col gap-[20px] pb-[81px] pt-[76px]">
          <Text typography="text1-medium" color="sub">
            내가 좋아할만한 퀴즈를 보고 싶다면?
          </Text>
          <SetInterestedCategoryDrawer
            triggerComponent={<Button variant={'mediumRound'}>관심분야 설정하기</Button>}
          />
        </div>
      )}
    </div>
  )
}

export default InterestedCategoryCollections
