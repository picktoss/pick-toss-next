import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import CategoryTag from './category-tag'
import Link from 'next/link'
import Image from 'next/image'
import icons from '@/constants/icons'

import { Category } from '../mock-data'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '@/lib/utils'

interface Props extends Category {}

export default function CategoryItem({ id, emoji, name, tag, documents }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
  }

  return (
    <Link href={`/repository/${id}`} ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div
        className={cn(
          'relative cursor-pointer rounded-xl bg-white p-4 min-w[240px] hover:drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition duration-200',
          isDragging && 'opacity-50',
        )}
      >
        <div className="mb-3 text-2xl">{emoji}</div>
        <div className="absolute right-[12px] top-[8px]">
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <div className="flex size-[25px] items-center justify-center rounded-full hover:bg-gray-02">
                <Image src={icons.kebab} alt="" width={15} height={3} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <div className="flex gap-4">
                  <Image src="/icons/modify-pencil.svg" alt="" width={16} height={16} />
                  <span className="text-gray-09">이름 바꾸기</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex gap-4">
                  <Image src="/icons/no-chat.svg" alt="" width={16} height={16} />
                  <span className="text-gray-09">퀴즈 생성 끄기</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex gap-4">
                  <Image src="/icons/trashcan-red.svg" alt="" width={16} height={16} />
                  <span className="text-notice-red">폴더 삭제하기</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mb-1 flex items-center gap-2">
          <div className="text-h4-bold text-gray-09">{name}</div>
          <CategoryTag tag={tag} />
        </div>
        <div className="text-small1-regular text-gray-08">문서 {documents.length}개</div>
      </div>
    </Link>
  )
}
