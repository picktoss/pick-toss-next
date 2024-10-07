import Icon, { IconProps } from '@/shared/components/v3/icon'
import FolderSelectDrawer from './folder-select-drawer'
import IconButton from './icon-button'
import { useQuizNoteContext } from '../context/quiz-note-context'
import Text from '@/shared/components/text'

// Header 컴포넌트
const Header = () => {
  const iconList = ['search', 'sort', 'menu-dots'] as IconProps['name'][]
  const { isSelectMode, setIsSelectMode } = useQuizNoteContext()

  return (
    <header className="fixed right-1/2 top-0 z-10 flex h-[108px] w-full max-w-[430px] translate-x-1/2 flex-col justify-end bg-background-base-02 px-[14px]">
      <div className="flex h-1/2 w-full items-center justify-between">
        {isSelectMode ? (
          <>
            <Icon name="cancel" className="size-[24px]" onClick={() => setIsSelectMode(false)} />
            <Text as="span" typography="subtitle2-medium" className="ml-[35px]">
              전공 공부
            </Text>
            <Text as="span" typography="button4" className="text-button-text-primary">
              전체 선택
            </Text>
          </>
        ) : (
          <>
            <FolderSelectDrawer />

            <div className="flex size-fit items-center gap-[16px]">
              {iconList.map((iconName) => (
                <IconButton key={iconName} iconName={iconName} />
              ))}
            </div>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
