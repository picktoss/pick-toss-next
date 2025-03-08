'use client'

import Icon from '@/shared/components/custom/icon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { useAmplitudeContext } from '@/shared/hooks/use-amplitude-context'

interface SortCollectionDropdownProps {
  sort: (option: 'POPULARITY' | 'UPDATED') => void
}

export const SortCollectionDropdown = ({ sort }: SortCollectionDropdownProps) => {
  const { collectionSortChangeEvent } = useAmplitudeContext()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Icon name="sort" className="size-[16px]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="right-0 w-[240px] bg-background-base-01">
        <DropdownMenuItem
          onClick={() => {
            collectionSortChangeEvent({
              option: '최신',
            })
            sort('UPDATED')
          }}
        >
          최근 업데이트 순
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            collectionSortChangeEvent({
              option: '인기',
            })
            sort('POPULARITY')
          }}
        >
          인기순
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
