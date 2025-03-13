'use client'

import InviteRewardDrawer from '@/features/payment/components/invite-reward-drawer'
import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { useUserStore } from '@/store/user'
import Link from 'next/link'
import { useEffect } from 'react'

const Header = () => {
  const { userInfo: user } = useUserStore()

  useEffect(() => {
    if (typeof window !== undefined) {
      const metaTag = document.querySelector('meta[name="theme-color"]')

      if (metaTag) {
        setTimeout(() => metaTag.setAttribute('content', '#F5F7F9'), 100)
      }

      return () => {
        if (metaTag) {
          metaTag.setAttribute('content', '#FFFFFF')
        }
      }
    }
  }, [])

  return (
    <header className="flex h-[54px] w-full max-w-mobile items-center justify-between bg-background-base-02 px-[18px]">
      <Icon name="logo" className="h-[36px]" />

      <div className="flex-center gap-[16px]">
        <InviteRewardDrawer
          triggerComponent={
            <Text typography="subtitle2-bold" color="secondary" className="flex-center">
              <Icon name="star" className="mr-[4px] size-[20px]" />
              {user?.star}
            </Text>
          }
        />
        {/* TODO: 결제 기능 구현 후 아래 코드로 변경 */}
        {/* <Link href={'/payment'}>
          <Text typography="subtitle2-bold" color="secondary" className="flex-center">
            <Icon name="star" className="mr-[4px] size-[20px]" />
            {user?.star}
          </Text>
        </Link> */}
        <Link href={'/search?prev=home'}>
          <Icon name="search" className="size-[24px]" />
        </Link>
        <Link href={'/notification?prev=home'}>
          <Icon name="notification" className="size-[24px]" />
        </Link>
      </div>
    </header>
  )
}

export default Header
