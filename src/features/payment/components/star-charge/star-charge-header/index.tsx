'use client'

import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { useRouter } from 'next/navigation'

const StarChargeHeader = () => {
  const router = useRouter()

  return (
    <header className="relative z-10 flex h-[54px] w-full items-center px-[16px] text-text-primary-inverse">
      <button onClick={() => router.back()}>
        <Icon name="cancel" className="size-[24px]" />
      </button>
      <Text typography="subtitle2-medium" className="center">
        별 충전소
      </Text>
    </header>
  )
}

export default StarChargeHeader
