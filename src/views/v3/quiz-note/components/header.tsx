import Icon, { IconProps } from '@/shared/components/v3/icon'
import { useQuizNoteContext } from '../context/quiz-note-context'
import { useEffect, useRef } from 'react'
import { MenuFolderItems, MenuSortItems } from './menu-items'
import FolderSelectDrawer from './folder-select-drawer'

// Header 컴포넌트
const Header = () => {
  const iconList = ['search', 'sort', 'menu-dots'] as IconProps['name'][]
  const { menuState, setMenu } = useQuizNoteContext()
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      event.stopPropagation()

      if (menuState.isOpened && !menuRef.current?.contains(event.target as Node)) {
        setMenu({ isOpened: false, type: '' })
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuState.isOpened, setMenu])

  const handleClickMenu = (iconName: IconProps['name']) => {
    if (iconName === 'menu-dots') {
      setMenu({ isOpened: true, type: 'folder' })
      return
    }
    if (iconName === 'sort') {
      setMenu({ isOpened: true, type: 'sort' })
      return
    }
    alert('clicked ' + iconName)
    return
  }

  return (
    <div className="fixed left-0 top-0 z-50 flex h-[108px] w-full flex-col justify-end px-[14px]">
      <div className="flex h-1/2 w-full items-center justify-between">
        <FolderSelectDrawer />

        <div className="flex size-fit items-center gap-[16px]">
          {iconList.map((iconName) => (
            <Icon
              key={iconName}
              name={iconName}
              className="size-[24px]"
              onClick={() => handleClickMenu(iconName)}
            ></Icon>
          ))}
        </div>
      </div>

      {menuState.isOpened && (
        <div
          ref={menuRef}
          className="absolute right-[16px] top-[110px] z-10 size-fit rounded-[12px] bg-background-base-01 text-subtitle2-medium shadow-custom-shadow"
        >
          {menuState.type === 'folder' && <MenuFolderItems />}
          {menuState.type === 'sort' && <MenuSortItems />}
        </div>
      )}
    </div>
  )
}

export default Header
