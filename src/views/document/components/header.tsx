import { DocumentStatus } from '@/actions/types/dto/document.dto'
import { StatusTag } from '../ui/status-tag'
import { formatDateKorean } from '@/shared/utils/date'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import Image from 'next/image'
import icons from '@/constants/icons'
import Link from 'next/link'
import DeleteDocumentModal from '@/views/category/components/delete-document-modal'

interface Props {
  documentName: string
  createdAt: string
  status: DocumentStatus
  documentId: string | string[]
}

// viewer의 Header 컴포넌트
const Header = ({ documentName, createdAt, status, documentId }: Props) => {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h3 className="line-clamp-1 text-h3-bold text-gray-08 hover:text-clip">{documentName}</h3>
        <div className="mt-[8px] flex items-center gap-[8px]">
          <p className="text-body2-regular text-gray-06">{formatDateKorean(createdAt)}</p>
          <StatusTag status={status} />
        </div>
      </div>

      <DocumentDropdown documentId={documentId as string} documentName={documentName} />
    </div>
  )
}

export default Header

// Header 컴포넌트 내부에서 사용되는 컴포넌트
function DocumentDropdown({
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
