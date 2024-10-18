'use client'

import Text from '@/shared/components/ui/text'
import { useQuizNoteContext } from '../context/quiz-note-context'
import { Checkbox } from '@/shared/components/ui/checkbox'
import NoteTypeIcon from '@/views/shared/note-type-icon'
import Icon from '@/shared/components/icon'

interface Props {
  id: number
  title: string
  content: string
  quizCount: number
  characterCount: number
  folder: string
}

// 임시 (swipe 구현 안된 컴포넌트)
// NoteCard 컴포넌트
const NoteCard = ({ id, title, content, quizCount, characterCount, folder }: Props) => {
  const { isSelectMode } = useQuizNoteContext()
  // data : 노트 제목, 미리보기 문장, 문제 수, 글자수, 소속 폴더 이름 필요

  return (
    <div className="flex h-[104px] max-w-full items-center rounded-[16px] bg-white px-[16px] pb-[20px] pt-[17px]">
      {isSelectMode ? (
        <Checkbox id={'note_' + id} className="mx-[8px] size-[20px]" />
      ) : (
        <NoteTypeIcon type="write" containerClassName="size-[36px]" iconClassName="size-[16px]" />
      )}

      <div className="ml-[16px] flex w-full flex-col">
        <h4 className="w-fit text-subtitle2-bold">{title}</h4>
        <Text
          as="p"
          typography="text1-regular"
          className="w-[calc(100%-55px)] truncate text-nowrap break-all text-text-sub"
        >
          {content}
        </Text>
        <Text typography="text2-medium" className="flex w-fit items-center text-text-sub">
          <Text as="span">{quizCount}문제</Text>
          <Icon name="middle-dot" />
          <Text as="span">{characterCount}자</Text>
          <Icon name="middle-dot" />
          <Text as="span" className="flex items-center">
            <Icon name="folder-fill" className="mr-[2px]" />
            {folder}
          </Text>
        </Text>
      </div>
    </div>
  )
}

export default NoteCard
