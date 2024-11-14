import DirectorySelectDrawer from '@/features/document/components/directory-select-drawer'
import GoBackButton from '@/shared/components/custom/go-back-button'
import Text from '@/shared/components/ui/text'

const Header = () => {
  return (
    <header className="fixed right-1/2 top-0 z-20 flex h-[54px] w-full max-w-mobile translate-x-1/2 border-b border-border-divider bg-background-base-01 px-[16px] transition-all">
      <div className="flex size-full items-center justify-between">
        <div className="flex items-center">
          <GoBackButton icon="cancel" />
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
