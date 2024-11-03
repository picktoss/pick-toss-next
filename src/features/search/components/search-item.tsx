import Icon from '@/shared/components/custom/icon'
import Tag from '@/shared/components/ui/tag'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import NoteTypeIcon from '@/features/note/components/note-type-icon'

interface Props {
  noteType: 'file' | 'write' | 'notion'
  noteTitle: string
  matchingSentence: string
  resultType: 'note' | 'quiz'
  noteFolder: string
  lastItem?: boolean
}

const SearchItem = ({
  noteType,
  noteTitle,
  matchingSentence,
  resultType,
  noteFolder,
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
        <NoteTypeIcon
          type={noteType}
          containerClassName="size-[20px] mr-[8px]"
          iconClassName="size-[10px]"
        />
        <Text typography="subtitle2-bold">{noteTitle}</Text>
      </div>

      {/* todo: 키워드와 일치하는 부분 색상 accent표시 하는 로직 필요 */}
      <Text>{matchingSentence}</Text>

      <div className="mt-[8px] flex items-center">
        <Tag colors={'tertiary'} className="mr-[8px]">
          {resultType === 'note' && '노트 결과'}
          {resultType === 'quiz' && '퀴즈 결과'}
        </Tag>
        <div className="flex items-center">
          <Icon name="folder-fill" className="mr-[4px] size-[14px] text-icon-tertiary" />
          <Text>{noteFolder}</Text>
        </div>
      </div>
    </div>
  )
}

export default SearchItem
