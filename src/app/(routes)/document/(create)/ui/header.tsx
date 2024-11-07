'use client'

import DirectorySelectDrawer from '@/features/document/components/directory-select-drawer'
import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { useRouter } from 'next/navigation'

const Header = () => {
  const router = useRouter()

  return (
    <header className="fixed right-1/2 top-0 z-20 flex h-[54px] w-full max-w-mobile translate-x-1/2 border-b border-border-divider bg-background-base-01 px-[16px] transition-all">
      <div className="flex size-full items-center justify-between">
        <div className="flex items-center">
          <button onClick={() => router.back()}>
            <Icon name="cancel" className="size-[24px]" />
          </button>
        </div>
        <div className="flex items-center text-text1-medium">
          <Text className="mr-[12px] text-text-sub">폴더</Text>
          <DirectorySelectDrawer />
        </div>
      </div>
    </header>
  )
}

export default Header
