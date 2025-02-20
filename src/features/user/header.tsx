'use client'

import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import usePreviousPath from '@/shared/hooks/use-previous-path'
import { useUserStore } from '@/store/user'
import Link from 'next/link'
import InviteRewardDrawer from '../payment/components/invite-reward-drawer'

const Header = () => {
  usePreviousPath()
  const { userInfo: user } = useUserStore()

  return (
    <header className="flex h-[54px] w-full max-w-mobile items-center justify-between bg-background-base-01 px-[18px]">
      <Text typography="title2">{user?.name}님</Text>
      <div className="flex-center gap-[16px]">
        <InviteRewardDrawer
          triggerComponent={
            <Text typography="subtitle2-bold" className="flex-center text-text-secondary">
              <Icon name="star" className="mr-[4px] size-[20px]" />
              {user?.star}
            </Text>
          }
        />

        {/* TODO: 결제 기능 구현 후 아래 코드로 변경 */}
        {/* <Link href={'/payment'}>
          <Text typography="subtitle2-bold" className="flex-center text-text-secondary">
            <Icon name="star" className="mr-[4px] size-[20px]" />
            {user?.star}
          </Text>
        </Link> */}

        <Link href={'/notification'}>
          <Icon name="notification" className="size-[24px]" />
        </Link>
      </div>
    </header>
  )
}

export default Header
