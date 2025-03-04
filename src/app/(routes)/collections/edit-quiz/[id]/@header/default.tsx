'use client'

import GoBackButton from '@/shared/components/custom/go-back-button'
import Text from '@/shared/components/ui/text'
import { useParams, useRouter } from 'next/navigation'

const Header = () => {
  const router = useRouter()
  const id = useParams().id as string

  return (
    <header className="fixed top-0 z-50 flex h-[54px] w-full max-w-mobile shrink-0 items-center bg-white px-[16px]">
      <GoBackButton icon="cancel" onClick={() => router.replace(`/collections/${id}`)} />
      <div className="absolute right-1/2 translate-x-1/2">
        <Text as="h1" typography="subtitle2-medium">
          문제 편집
        </Text>
      </div>
    </header>
  )
}

export default Header
