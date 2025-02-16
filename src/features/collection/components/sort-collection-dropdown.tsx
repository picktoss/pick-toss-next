import Icon from '@/shared/components/custom/icon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'

interface SortCollectionDropdownProps {
  sort: (option: 'POPULARITY' | 'UPDATED') => void
}

export const SortCollectionDropdown = ({ sort }: SortCollectionDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Icon name="sort" className="size-[16px]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="right-0 w-[240px] bg-background-base-01">
        <DropdownMenuItem onClick={() => sort('UPDATED')}>최근 업데이트 순</DropdownMenuItem>
        <DropdownMenuItem onClick={() => sort('POPULARITY')}>인기순</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
