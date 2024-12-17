'use client'

import Icon from '@/shared/components/custom/icon'
import { Button } from '@/shared/components/ui/button'
import Text from '@/shared/components/ui/text'
import { useUserStore } from '@/store/user'
import Link from 'next/link'

const SubscribeCard = () => {
  const { userInfo: user } = useUserStore()

  return (
    <div className="relative flex h-[209px] w-full flex-col rounded-[16px] bg-[var(--color-gray-100)] px-[23px] pb-[22px] pt-[18px]">
      <div className="flex-center center h-fit w-full flex-col gap-[20px]">
        <Text typography="text1-medium" color="sub">
          픽토스를 마음껏 즐기고 싶다면?
        </Text>

        <Link href={'/payment'}>
          <Button variant={'mediumRound'} className="px-[24px]">
            PRO 옵션 보기
          </Button>
        </Link>
      </div>

      <Text typography="subtitle2-bold" className="text-[var(--color-gray-50)]">
        픽토스 PRO 구독권
      </Text>

      <Text typography="title2" className="mt-[8px] text-[var(--color-gray-50)]">
        {user?.name}님
      </Text>

      <div className="flex h-full flex-col items-end justify-between">
        <Icon name="infinite-gray" />

        <Text typography="text1-medium" className="text-[var(--color-gray-50)]">
          구독 정보 없음
        </Text>
      </div>
    </div>
  )
}

export default SubscribeCard
