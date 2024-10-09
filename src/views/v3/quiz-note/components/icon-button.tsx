'use client'

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

// IconButton 컴포넌트
const IconButton = ({ iconName }: { iconName: IconProps['name'] }) => {
  const { setDialogState, setIsSelectMode } = useQuizNoteContext()

  const handleClickMenuItem = (key: string) => {
    if (key === 'select') {
      setIsSelectMode(true)
      return
    }
    if (key === 'edit' || key === 'delete') {
      setDialogState({ isOpen: true, type: key })
      return
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
                  key={menuItem.key}
                  className={cn(
                    'border-t border-border-divider w-[240px] px-[20px] py-[16px]',
                    index === 0 && 'border-none'
                  )}
                  onClick={() => handleClickMenuItem(menuItem.key)}
                >
                  <Text
                    key={menuItem.key}
                    typography="subtitle2-medium"
                    className="flex w-full items-center justify-between"
                  >
                    {menuItem.label}
                    <Icon name={menuItem.iconName as IconProps['name']} />
                  </Text>
                </DropdownMenuItem>
              ))}

            {iconName === 'sort' &&
              sortItems.map((menuItem, index) => (
                <DropdownMenuItem
                  key={menuItem.key}
                  className={cn(
                    'border-t border-border-divider w-[240px] px-[20px] py-[16px]',
                    index === 0 && 'border-none'
                  )}
                  onClick={() => alert('clicked ' + menuItem.label)}
                >
                  <Text
                    key={menuItem.key}
                    typography="subtitle2-medium"
                    className="flex w-full items-center justify-between"
                  >
                    {menuItem.label}
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
