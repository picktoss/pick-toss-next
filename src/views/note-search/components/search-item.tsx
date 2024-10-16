import Icon from '@/shared/components/icon'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import NoteTypeIcon from '@/views/shared/note-type-icon'

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
      <div className="flex items-center mb-[8px]">
        <NoteTypeIcon
          type={noteType}
          containerClassName="size-[20px] mr-[8px]"
          iconClassName="size-[10px]"
        />
        <Text typography="subtitle2-bold">{noteTitle}</Text>
      </div>

      {/* todo: 키워드와 일치하는 부분 색상 accent표시 하는 로직 필요 */}
      <Text>{matchingSentence}</Text>

      <div className="flex items-center mt-[8px]">
        <Text
          typography="caption-medium"
          className="px-[6px] py-[2px] bg-background-base-03 rounded-[4px] text-text-sub mr-[8px]"
        >
          {resultType === 'note' && '노트 결과'}
          {resultType === 'quiz' && '퀴즈 결과'}
        </Text>
        <div className="flex items-center">
          <Icon name="folder-fill" className="text-icon-tertiary size-[14px] mr-[4px]" />
          <Text>{noteFolder}</Text>
        </div>
      </div>
    </div>
  )
}

export default SearchItem
