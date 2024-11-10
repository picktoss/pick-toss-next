import Icon from '@/shared/components/custom/icon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'

const SortIconBtn = () => {
  const sortItems = [
    { key: 'upload', label: '업로드한 날짜' },
    { key: 'open', label: '마지막으로 열어본 시간' },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Icon name="sort" className="size-[24px]"></Icon>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="bg-background-base-01 p-0">
        {sortItems.map((menuItem, index) => (
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
  )
}

export default SortIconBtn
