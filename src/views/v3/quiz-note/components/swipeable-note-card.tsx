import { useState } from 'react'
import { motion, PanInfo } from 'framer-motion'
import { EllipseIcon, FolderFillIcon } from './svg-icons'
import Icon from '@/shared/components/v3/icon'
import { useQuizNoteContext } from '../context/quiz-note-context'
import { cn } from '@/shared/lib/utils'
import { Checkbox } from '@/shared/components/ui/checkbox'

interface NoteProps {
  id: string
  createType: 'write' | 'file' | 'notion'
  title: string
  content: string
  quizCount: number
  characterCount: number
  folder: string
}

const SwipeableNoteCard = ({
  id,
  createType,
  title,
  content,
  quizCount,
  characterCount,
  folder,
}: NoteProps) => {
  const { isSelectMode } = useQuizNoteContext()
  const [isSwiped, setIsSwiped] = useState(false)
  const [dragX, setDragX] = useState(0)

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -10) {
      setIsSwiped(true) // 10px 이상 드래그하면 스와이프
      setDragX(-130) // 요소가 -130px 이동
    } else {
      setIsSwiped(false) // 스와이프 취소
      setDragX(0) // 원래 위치로 돌아옴
    }
  }

  return (
    <div
      className={`relative flex h-[104px] max-w-full items-center overflow-hidden rounded-[16px] bg-white px-[16px] pb-[20px] pt-[17px]`}
    >
      {/* Swipe 영역 */}
      <motion.div
        className={cn(
          `flex h-[104px] max-w-full items-center rounded-[16px] px-[16px] pb-[20px] pt-[17px]`,
          isSwiped && 'translate-x-[-116px]'
        )}
        drag="x"
        dragConstraints={{ left: -130, right: 0 }}
        onDrag={(event, info) => setDragX(info.point.x)}
        onDragEnd={handleDragEnd}
        animate={{ x: dragX }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }} // 애니메이션 스프링 효과 적용
      >
        {isSelectMode ? (
          <Checkbox id={'note_' + id} className="mx-[8px] size-[20px]" />
        ) : (
          <NoteTypeIcon type={createType} />
        )}

        <div className="ml-[16px] flex w-full flex-col">
          <h4 className="w-fit text-subtitle2-bold">{title}</h4>
          <p className="w-[calc(100%-55px)] truncate text-nowrap break-all text-text-sub">
            {content}
          </p>
          <div className="flex w-fit items-center text-text-sub">
            <span>{quizCount}문제</span>
            <EllipseIcon />
            <span>{characterCount}자</span>
            <EllipseIcon />
            <span className="flex items-center">
              <FolderFillIcon className="mr-[2px]" />
              {folder}
            </span>
          </div>
        </div>

        {/* Swipe로 보여지는 버튼 영역 */}
        <div
          className={cn(
            'absolute h-[calc(100%+2px)] inset-y-0 right-[-160px] flex flex-row overflow-hidden rounded-r-[16px] transition-all',
            isSwiped && 'translate-x-[-16px]'
          )}
        >
          <button
            className="flex-center w-[72px] flex-col rounded-lg bg-background-container-03 p-2 text-text1-medium text-text-info"
            onClick={() => alert('clicked 이동')}
          >
            <Icon name="move" className="mb-[4px]" />
            이동
          </button>
          <button
            className="flex-center w-[72px] flex-col rounded-lg bg-background-critical p-2 text-text1-medium text-text-primary-inverse"
            onClick={() => alert('clicked 삭제')}
          >
            <Icon name="bin" className="mb-[4px]" />
            삭제
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default SwipeableNoteCard

// NoteCard 내부에서 사용되는 컴포넌트
function NoteTypeIcon({ type }: { type: 'write' | 'file' | 'notion' }) {
  if (type === 'write') {
    return (
      <div className="flex-center size-[36px] shrink-0 rounded-full bg-fill-secondary-orange text-text-primary-inverse">
        <Icon name="document" className="size-[16px]" />
      </div>
    )
  }

  if (type === 'file') {
    return (
      <div className="flex-center size-[36px] shrink-0 rounded-full bg-fill-secondary-blue text-text-primary-inverse">
        <Icon name="clip" className="size-[16px]" />
      </div>
    )
  }

  if (type === 'notion') {
    return (
      <div className="flex-center size-[36px] shrink-0 rounded-full border border-border-default bg-background-base-01 text-text-primary-inverse">
        <Icon name="notion" className="size-[19px]" />
      </div>
    )
  }
}
