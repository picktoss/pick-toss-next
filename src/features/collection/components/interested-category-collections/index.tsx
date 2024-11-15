import SwipeableCardList from '@/shared/components/custom/swipeable-card-list'
import Text from '@/shared/components/ui/text'
import Link from 'next/link'
import { InterestedCategoryItems } from '../../config/interested-category-items'
import InterestedCategoryItemCard from '../interested-category-item-card'
import { Button } from '@/shared/components/ui/button'
import SetInterestedCategoryDrawer from '@/features/category/components/set-interested-category-drawer'

// 메인페이지의 유저 관심분야 컬렉션
const InterestedCategoryCollections = ({ interestedCategory }: { interestedCategory?: string }) => {
  return (
    <div className="flex w-full flex-col">
      <div className="mb-[20px] flex items-center justify-between">
        <Text typography="title3">픽토스님의 관심분야 컬렉션</Text>
        {interestedCategory && (
          // 더보기 클릭 - '분야'필터에 관심분야 설정된 상태의 컬렉션 gnb로 이동
          <Link href={''}>
            <Text typography="text1-medium" color="sub">
              더보기
            </Text>
          </Link>
        )}
      </div>

      {interestedCategory ? (
        <SwipeableCardList
          cardComponents={InterestedCategoryItems.map((item) => (
            <InterestedCategoryItemCard
              key={item.id}
              emoji={item.emoji}
              title={item.name}
              isBookmarked={false}
              bookmarkCount={item.bookmarkCount}
              quizCount={item.quizCount}
            />
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
