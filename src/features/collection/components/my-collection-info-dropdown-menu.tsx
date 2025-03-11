'use client'

import { useDeleteCollection } from '@/requests/collection/hooks'
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

const MyCollectionInfoDropdownMenu = ({ collectionId }: Props) => {
  const router = useRouter()
  const { mutate: deleteCollection } = useDeleteCollection()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Icon name="menu-dots" className="size-[24px]" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[240px] cursor-pointer bg-white p-0">
          <DropdownMenuItem
            className="flex justify-between px-5 py-4 hover:bg-gray-100"
            onClick={() => router.push(`/collections/edit-info/${collectionId}`)}
          >
            <Text typography="subtitle2-medium">컬렉션 정보 수정</Text>
            <Icon name="write-line" className="size-[20px]" />
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex justify-between px-5 py-4 hover:bg-gray-100"
            onClick={() => router.push(`/collections/edit-quiz/${collectionId}`)}
          >
            <Text typography="subtitle2-medium">문제 편집</Text>
            <Icon name="write-line" className="size-[20px]" />
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex justify-between px-5 py-4 text-text-critical hover:bg-gray-100"
            onClick={() => {
              deleteCollection(collectionId, {
                onSuccess: () => router.back(),
              })
            }}
          >
            <Text typography="subtitle2-medium">컬렉션 삭제</Text>
            <Icon name="bin" className="size-[20px]" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default MyCollectionInfoDropdownMenu
