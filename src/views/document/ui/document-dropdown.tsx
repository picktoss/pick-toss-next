'use client'

import icons from '@/constants/icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import DeleteDocumentModal from '@/views/category/components/delete-document-modal'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function DocumentDropdown({
  documentId,
  documentName,
}: {
  documentId: string
  documentName: string
}) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const router = useRouter()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <div className="ml-[10px] flex size-[25px] items-center justify-center rounded-full hover:bg-gray-02">
            <Image src={icons.kebab} alt="" width={15} height={3} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href={`/modify/${documentId}`} className="flex gap-4">
              <Image src="/icons/document.svg" alt="" width={16} height={16} />
              <span className="text-gray-09">문서 수정하기</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(event) => {
              event.stopPropagation()
              setDeleteDialogOpen(true)
            }}
          >
            <div className="flex gap-4">
              <Image src="/icons/trashcan-red.svg" alt="" width={16} height={16} />
              <span className="text-notice-red">노트 삭제하기</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteDocumentModal
        id={Number(documentId)}
        name={documentName}
        sortOption="updatedAt"
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        onSuccess={() => router.back()}
        showLoading={true}
      />
    </>
  )
}
