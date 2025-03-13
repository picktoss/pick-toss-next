'use client'

import GoBackButton from '@/shared/components/custom/go-back-button'
import Text from '@/shared/components/ui/text'
import { useRouter, useSearchParams } from 'next/navigation'

const Header = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const prev = searchParams.get('prev')

  const handleClickBack = () => {
    if (prev) {
      if (prev === 'home') {
        router.replace('/main')
      }
    } else {
      router.back()
    }
  }

  return (
    <header className="relative flex h-[54px] w-full items-center bg-background-base-01 px-[16px]">
      <GoBackButton onClick={handleClickBack} />
      <Text typography="subtitle2-medium" className="center">
        알림
      </Text>
    </header>
  )
}

export default Header
