import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import Icon, { IconProps } from '@/shared/components/v3/icon'
import { menuItems, sortItems } from '../constants/dropdown-menu'
import { cn } from '@/shared/lib/utils'
import Text from '@/shared/components/text'
import { useQuizNoteContext } from '../context/quiz-note-context'

const IconButton = ({ iconName }: { iconName: IconProps['name'] }) => {
  const { setDialogState } = useQuizNoteContext()

  const handleClickMenuItem = (text: string) => {
    if (text === '폴더 이름 바꾸기') {
      setDialogState({ isOpen: true, type: 'edit' })
    }
    if (text === '폴더 삭제') {
      setDialogState({ isOpen: true, type: 'delete' })
    }
  }

  return (
    <>
      {iconName === 'search' ? (
        <Icon name={iconName} className="size-[24px]"></Icon>
      ) : (
        <DropdownMenu key={iconName}>
          <DropdownMenuTrigger>
            <Icon name={iconName} className="size-[24px]"></Icon>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="bg-background-base-01 p-0">
            {iconName === 'menu-dots' &&
              menuItems.map((menuItem, index) => (
                <DropdownMenuItem
                  key={menuItem.text}
                  className={cn(
                    'border-t border-border-divider w-[240px] px-[20px] py-[16px]',
                    index === 0 && 'border-none'
                  )}
                  onClick={() => handleClickMenuItem(menuItem.text)}
                >
                  <Text
                    key={menuItem.text}
                    typography="subtitle2-medium"
                    className="flex w-full items-center justify-between"
                  >
                    {menuItem.text}
                    <Icon name={menuItem.iconName as IconProps['name']} />
                  </Text>
                </DropdownMenuItem>
              ))}

            {iconName === 'sort' &&
              sortItems.map((menuItem, index) => (
                <DropdownMenuItem
                  key={menuItem}
                  className={cn(
                    'border-t border-border-divider w-[240px] px-[20px] py-[16px]',
                    index === 0 && 'border-none'
                  )}
                  onClick={() => alert('clicked ' + menuItem)}
                >
                  <Text
                    key={menuItem}
                    typography="subtitle2-medium"
                    className="flex w-full items-center justify-between"
                  >
                    {menuItem}
                  </Text>
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  )
}

export default IconButton
