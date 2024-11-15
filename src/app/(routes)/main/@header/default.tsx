'use client'

import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import usePreviousPath from '@/shared/hooks/use-previous-path'
import Link from 'next/link'

const Header = () => {
  usePreviousPath()

  return (
    <header className="flex h-[54px] w-full max-w-mobile items-center justify-between bg-background-base-02 px-[18px]">
      <Icon name="logo" className="h-[36px]" />

      <div className="flex-center gap-[16px]">
        <Text typography="subtitle2-bold" color="secondary" className="flex-center">
          <Icon name="star" className="mr-[4px] size-[20px]" />
          130
        </Text>
        <button>
          <Icon name="search" className="size-[24px]" />
        </button>
        <Link href={'/notification'}>
          <Icon name="notification" className="size-[24px]" />
        </Link>
      </div>
    </header>
  )
}

export default Header
