import { DocumentStatus } from '@/actions/types/dto/document.dto'
import { StatusTag } from '../ui/status-tag'
import { formatDateKorean } from '@/shared/utils/date'
import { DocumentDropdown } from '../ui/document-dropdown'

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
