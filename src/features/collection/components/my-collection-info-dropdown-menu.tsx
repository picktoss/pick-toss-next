'use client'

import Icon from '@/shared/components/custom/icon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import Text from '@/shared/components/ui/text'
import { useRouter } from 'next/navigation'

interface Props {
  collectionId: number
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MyCollectionInfoDropdownMenu = ({ collectionId }: Props) => {
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Icon name="menu-dots" className="size-[24px]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-[240px] bg-white p-0 *:cursor-pointer"
        onClick={() => router.push(`/collections/edit-info/${collectionId}`)}
      >
        <DropdownMenuItem className="flex justify-between px-5 py-4 hover:bg-gray-100">
          <Text typography="subtitle2-medium">컬렉션 정보 수정</Text>
          <Icon name="write-line" className="size-[20px]" />
        </DropdownMenuItem>
        <DropdownMenuItem className="flex justify-between px-5 py-4 hover:bg-gray-100">
          <Text typography="subtitle2-medium">문제 편집</Text>
          <Icon name="write-line" className="size-[20px]" />
        </DropdownMenuItem>
        {/** TODO: Delete Dialog */}
        <DropdownMenuItem className="flex justify-between px-5 py-4 text-text-critical hover:bg-gray-100">
          <Text typography="subtitle2-medium">컬렉션 삭제</Text>
          <Icon name="bin" className="size-[20px]" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MyCollectionInfoDropdownMenu
