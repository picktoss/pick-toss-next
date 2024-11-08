'use client'

import GoBackButton from '@/shared/components/custom/go-back-button'
import Text from '@/shared/components/ui/text'
import { useRouter } from 'next/navigation'

const Header = () => {
  const router = useRouter()

  return (
    <header className="relative flex h-[54px] w-full items-center bg-background-base-01 px-[16px]">
      <GoBackButton onClick={() => router.replace('/profile')} />
      <Text typography="subtitle2-medium" className="center">
        별 내역
      </Text>
    </header>
  )
}

export default Header
