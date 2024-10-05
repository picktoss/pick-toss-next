import { IconProps } from '@/shared/components/v3/icon'
import FolderSelectDrawer from './folder-select-drawer'
import IconButton from './icon-button'

// Header 컴포넌트
const Header = () => {
  const iconList = ['search', 'sort', 'menu-dots'] as IconProps['name'][]

  return (
    <div className="fixed right-1/2 top-0 z-50 flex h-[108px] w-full max-w-[430px] translate-x-1/2 flex-col justify-end px-[14px]">
      <div className="flex h-1/2 w-full items-center justify-between">
        <FolderSelectDrawer />

        <div className="flex size-fit items-center gap-[16px]">
          {iconList.map((iconName) => (
            <IconButton key={iconName} iconName={iconName} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Header
