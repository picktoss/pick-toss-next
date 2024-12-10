import Icon from '@/shared/components/custom/icon'
import Tag from '@/shared/components/ui/tag'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import DocumentTypeIcon from '@/features/document/components/document-type-icon'

interface Props {
  createType: Document.ItemInList['documentType']
  documentTitle: string
  matchingSentence: React.ReactNode
  resultType: 'document' | 'quiz'
  relativeDirectory: string
  lastItem?: boolean
}

const SearchItem = ({
  createType,
  documentTitle,
  matchingSentence,
  resultType,
  relativeDirectory,
  lastItem,
}: Props) => {
  return (
    <div
      className={cn(
        'border-b border-border-divider py-[24px] flex flex-col',
        lastItem && 'border-none'
      )}
    >
      <div className="mb-[8px] flex items-center">
        <DocumentTypeIcon
          type={createType}
          containerClassName="size-[20px] mr-[8px]"
          iconClassName="size-[10px]"
        />
        <Text typography="subtitle2-bold">{documentTitle}</Text>
      </div>

      <Text>{matchingSentence}</Text>

      <div className="mt-[8px] flex items-center">
        <Tag colors={'tertiary'} className="mr-[8px]">
          {resultType === 'document' && '노트 결과'}
          {resultType === 'quiz' && '퀴즈 결과'}
        </Tag>
        <div className="flex items-center">
          <Icon name="directory-fill" className="mr-[4px] size-[14px] text-icon-tertiary" />
          <Text>{relativeDirectory}</Text>
        </div>
      </div>
    </div>
  )
}

export default SearchItem
