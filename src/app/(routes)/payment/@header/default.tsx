'use client'

import GoBackButton from '@/shared/components/custom/go-back-button'
import { useDynamicThemeColor } from '@/shared/hooks/use-dynamic-theme-color'
import { isMobile } from 'react-device-detect'

const Header = () => {
  useDynamicThemeColor(isMobile, '#000000', '#FFFFFF')

  return (
    <header className="relative z-10 flex h-[54px] w-full items-center px-[16px] text-text-primary-inverse">
      <GoBackButton icon="cancel" />
    </header>
  )
}

export default Header
