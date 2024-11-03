'use client'

import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { useRouter } from 'next/navigation'

const Header = () => {
  const router = useRouter()

  return (
    <header className="sticky top-0 flex h-[54px] shrink-0 items-center bg-white px-[16px]">
      <button onClick={() => router.back()}>
        <Icon name="cancel" />
      </button>
      <div className="absolute right-1/2 translate-x-1/2">
        <Text as="h1" typography="subtitle2-medium">
          컬렉션 만들기
        </Text>
      </div>
    </header>
  )
}

export default Header
