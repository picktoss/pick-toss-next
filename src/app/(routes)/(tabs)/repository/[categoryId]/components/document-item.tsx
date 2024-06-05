import Link from 'next/link'
import icons from '@/constants/icons'
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '@/lib/utils'
import { Document } from '@/apis/fetchers/document/get-documents-for-category'
import { useState } from 'react'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import DeleteDocumentModal from './delete-document.modal'
import ModifyDocumentNameModal from './modify-document-name-modal'

interface Props extends Document {}

export default function DocumentItem(document: Props) {
  const { id, name } = document
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: id,
  })

  const [dialogStatus, setDialogStatus] = useState<'modify' | 'delete' | null>(null)

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
  }

  return (
    <Link href={`/document/${id}`} ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div
        className={cn(
          'flex h-[78px] items-center justify-between rounded-lg bg-white px-[27px] py-[15px] transition duration-200 hover:drop-shadow-[0_2px_8px_rgba(0,0,0,0.1)]',
          isDragging && 'opacity-50'
        )}
      >
        <div className="flex items-center">
          <div className="mr-4 flex size-12 items-center justify-center rounded-full bg-gray-01">
            <Image src="/icons/file.svg" alt="" width={24} height={24} />
          </div>
          <div className="text-body1-medium text-gray-09">{name}</div>
        </div>
        <div className="flex items-center gap-12">
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex size-[25px] items-center justify-center rounded-full hover:bg-gray-02">
                  <Image src={icons.kebab} alt="" width={15} height={3} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={(event) => {
                    event.stopPropagation()
                    setDialogStatus('modify')
                  }}
                >
                  <DialogTrigger asChild>
                    <div className="flex gap-4">
                      <Image src="/icons/modify-pencil.svg" alt="" width={16} height={16} />
                      <span className="text-gray-09">이름 바꾸기</span>
                    </div>
                  </DialogTrigger>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(event) => {
                    event.stopPropagation()
                    setDialogStatus('delete')
                  }}
                >
                  <DialogTrigger asChild>
                    <div className="flex gap-4">
                      <Image src="/icons/trashcan-red.svg" alt="" width={16} height={16} />
                      <span className="text-notice-red">노트 삭제하기</span>
                    </div>
                  </DialogTrigger>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {dialogStatus === 'delete' && <DeleteDocumentModal {...document} />}
            {dialogStatus === 'modify' && <ModifyDocumentNameModal {...document} />}
          </Dialog>
        </div>
      </div>
    </Link>
  )
}
