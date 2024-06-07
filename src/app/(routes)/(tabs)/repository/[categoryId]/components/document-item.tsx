import Link from 'next/link'
import icons from '@/constants/icons'
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { Document } from '@/apis/fetchers/document/get-documents-for-category'
import { useState } from 'react'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import DeleteDocumentModal from './delete-document.modal'
import ModifyDocumentNameModal from './modify-document-name-modal'
import { getRelativeTime } from '@/utils/date'
import { SortOption } from './document-list'

interface Props extends Document {
  sortOption: SortOption
}

export default function DocumentItem({ sortOption, ...document }: Props) {
  const { id, name, status, createdAt } = document

  const [dialogStatus, setDialogStatus] = useState<'modify' | 'delete' | null>(null)

  return (
    <Link href={`/document/${id}`}>
      <div className="flex h-[78px] items-center justify-between rounded-lg bg-white px-[27px] py-[15px] transition duration-200 hover:drop-shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
        <div className="flex items-center">
          <div className="mr-4 flex size-12 items-center justify-center rounded-full bg-gray-01">
            <Image src="/icons/file.svg" alt="" width={24} height={24} />
          </div>
          <div className="text-body1-medium text-gray-09">{name}</div>
        </div>
        <div className="flex items-center gap-12">
          <div className="w-[200px] text-body2-regular text-gray-06">
            마지막 수정: {getRelativeTime(createdAt)}
          </div>
          <div className="flex w-[93px] justify-center">
            <div
              className={cn(
                'flex items-center h-[19px] px-[9px] rounded-[4px] text-[10px] font-medium',
                pickStatus[status].style
              )}
            >
              {pickStatus[status].label}
            </div>
          </div>
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
            {dialogStatus === 'delete' && (
              <DeleteDocumentModal sortOption={sortOption} {...document} />
            )}
            {dialogStatus === 'modify' && (
              <ModifyDocumentNameModal sortOption={sortOption} {...document} />
            )}
          </Dialog>
        </div>
      </div>
    </Link>
  )
}

const pickStatus = {
  PROCESSED: {
    style: 'bg-gray-02 text-gray-07',
    label: '최신 상태',
  },
  UNPROCESSED: {
    style: 'bg-orange-01 text-orange-06',
    label: 'pick 생성 가능',
  },
  PROCESSING: {
    style: 'bg-gray-02 text-gray-07',
    label: 'pick 생성 중',
  },
  KEYPOINT_UPDATE_POSSIBLE: {
    style: 'bg-orange-01 text-orange-06',
    label: 'pick 갱신 필요',
  },
  DEFAULT_DOCUMENT: {
    style: 'bg-gray-02 text-gray-07',
    label: '기본 노트',
  },
}
