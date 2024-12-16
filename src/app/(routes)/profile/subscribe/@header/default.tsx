'use client'

import GoBackButton from '@/shared/components/custom/go-back-button'
import Text from '@/shared/components/ui/text'
import { usePathname } from 'next/navigation'

const Header = () => {
  const pathname = usePathname()
  const isHistoryPage = pathname === '/subscribe/history'
  const headerText = isHistoryPage ? '결제 내역' : '구독 및 결제'

  return (
    <header className="relative flex h-[54px] w-full items-center bg-background-base-01 px-[16px]">
      <GoBackButton />
      <Text typography="subtitle2-medium" className="center">
        {headerText}
      </Text>
    </header>
  )
}

export default Header
