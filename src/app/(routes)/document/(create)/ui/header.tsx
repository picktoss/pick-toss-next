'use client'

import DirectorySelectDrawer from '@/features/directory/components/directory-select-drawer'
import { useDirectoryContext } from '@/features/directory/contexts/directory-context'
import GoBackButton from '@/shared/components/custom/go-back-button'
import Text from '@/shared/components/ui/text'

const Header = () => {
  const { selectedDirectory } = useDirectoryContext()

  const directoryName = !selectedDirectory?.name
    ? '전체 노트'
    : selectedDirectory.tag === 'DEFAULT'
    ? '전체 노트'
    : selectedDirectory.name

  return (
    <header className="fixed right-1/2 top-0 z-20 flex h-[54px] w-full max-w-mobile translate-x-1/2 border-b border-border-divider bg-background-base-01 px-[16px] transition-all">
      <div className="flex size-full items-center justify-between">
        <div className="flex items-center">
          <GoBackButton icon="cancel" />
        </div>
        <div className="flex items-center text-text1-medium">
          <Text className="mr-[12px] text-text-sub">폴더</Text>
          <DirectorySelectDrawer
            trigger={
              <button className="rounded-full bg-background-base-02 px-[16px] py-[5px]">
                {`${selectedDirectory?.emoji ?? ''} ${directoryName}`}
              </button>
            }
          />
        </div>
      </div>
    </header>
  )
}

export default Header
