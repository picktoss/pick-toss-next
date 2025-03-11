import Icon from '@/shared/components/custom/icon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import Text from '@/shared/components/ui/text'
import Link from 'next/link'

interface Props {
  collectionId: number
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CollectionInfoDropdownMenu = ({ collectionId }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Icon name="menu-dots" className="size-[24px]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[240px] bg-white p-0 *:cursor-pointer" align="end">
        <Link href={`/collections/complaint/${collectionId}`}>
          <DropdownMenuItem className="flex justify-between px-5 py-4 hover:bg-gray-100">
            <Text typography="subtitle2-medium">컬렉션 신고</Text>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CollectionInfoDropdownMenu
