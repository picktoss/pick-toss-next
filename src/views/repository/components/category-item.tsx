import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import CategoryTag from './category-tag'
import Link from 'next/link'
import Image from 'next/image'
import icons from '@/constants/icons'
import { Category } from '@/actions/fetchers/category/get-categories'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '@/shared/lib/utils'
import DeleteCategoryModal from './delete-category-modal'
import { useState } from 'react'
import ModifyCategoryModal from './modify-category-modal'

interface Props extends Category {}

// CategoryItem 컴포넌트
const CategoryItem = (props: Props) => {
  const { id, emoji, name, tag, documents } = props
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: id,
  })

  const [modifyDialogOpen, setModifyDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
  }

  return (
    <>
      <Link
        href={`/repository/${id}`}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        <div
          className={cn(
            'relative w-[150px] cursor-pointer rounded-xl bg-white p-4 hover:drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition duration-200 lg:w-auto lg:min-w[240px]',
            isDragging && 'opacity-50'
          )}
        >
          <div className="mb-2 text-2xl lg:mb-3">{emoji || '📁'}</div>
          <div className="absolute right-[12px] top-[8px]">
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <div className="flex size-[25px] items-center justify-center rounded-full hover:bg-gray-02">
                  <Image src={icons.kebab} alt="" width={15} height={3} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={(event) => {
                    event.stopPropagation()
                    setModifyDialogOpen(true)
                  }}
                >
                  <div className="flex gap-4">
                    <Image src="/icons/modify-pencil.svg" alt="" width={16} height={16} />
                    <span className="text-gray-09">정보 수정하기</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(event) => {
                    event.stopPropagation()
                    setDeleteDialogOpen(true)
                  }}
                >
                  <div className="flex gap-4">
                    <Image src="/icons/trashcan-red.svg" alt="" width={16} height={16} />
                    <span className="text-notice-red">폴더 삭제하기</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mb-[32px] flex flex-col items-start gap-2 lg:mb-[6px] lg:flex-row lg:items-center">
            <div className="w-[118px] truncate text-body1-bold text-gray-09 lg:w-auto lg:text-h4-bold">
              {name}
            </div>
            <CategoryTag tag={tag} />
          </div>
          <div className="text-small1-regular text-gray-08">노트 {documents.length}개</div>
        </div>
      </Link>
      <DeleteCategoryModal open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} {...props} />
      <ModifyCategoryModal open={modifyDialogOpen} onOpenChange={setModifyDialogOpen} {...props} />
    </>
  )
}

export default CategoryItem
