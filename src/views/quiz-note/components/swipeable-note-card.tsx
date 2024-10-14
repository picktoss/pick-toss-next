'use client'

import { useState } from 'react'
import { motion, PanInfo, useAnimation, useMotionValue } from 'framer-motion'
import { EllipseIcon, FolderFillIcon } from './svg-icons'
import Icon from '@/shared/components/icon'
import { useQuizNoteContext } from '../context/quiz-note-context'
import { cn } from '@/shared/lib/utils'
import { Checkbox } from '@/shared/components/ui/checkbox'
import MoveNoteDrawer from './move-note-drawer'
import Text from '@/shared/components/ui/text'

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
  const x = useMotionValue(0)
  const controls = useAnimation()

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -30) {
      setIsSwiped(true) // 30px 이상 드래그하면 스와이프
      void controls.start({ x: -130 }) // 요소 왼쪽으로 130px 이동
    } else {
      setIsSwiped(false) // 스와이프 취소
      void controls.start({ x: 0 }) // 원래 위치로 이동
    }
  }

  return (
    <div
      className={`relative flex h-[104px] max-w-full items-center overflow-hidden rounded-[16px] bg-white px-[16px] pb-[20px] pt-[17px]`}
    >
      {/* Swipe 영역 */}
      <motion.div
        className={cn(
          `flex h-[104px] max-w-full items-center rounded-[16px] px-[16px] py-[17px]`,
          isSwiped && 'translate-x-[-116px]'
        )}
        drag="x"
        dragConstraints={{ left: -130, right: 0 }}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{ x }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {isSelectMode ? (
          <Checkbox id={'note_' + id} className="mx-[8px] size-[20px]" />
        ) : (
          <NoteTypeIcon type={createType} />
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
            <span>{quizCount}문제</span>
            <EllipseIcon />
            <span>{characterCount}자</span>
            <EllipseIcon />
            <span className="flex items-center">
              <FolderFillIcon className="mr-[2px]" />
              {folder}
            </span>
          </Text>
        </div>

        {/* Swipe로 보여지는 버튼 영역 */}
        <div
          className={cn(
            'absolute h-[calc(100%+2px)] inset-y-0 right-[-160px] flex flex-row overflow-hidden rounded-r-[16px] transition-all',
            isSwiped && 'translate-x-[-16px]'
          )}
        >
          <MoveNoteDrawer />
          <DeleteBtn />
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

function DeleteBtn() {
  return (
    <button
      className="flex-center w-[72px] flex-col rounded-lg bg-background-critical p-2 text-text1-medium text-text-primary-inverse"
      onClick={() => alert('clicked 삭제')}
    >
      <Icon name="bin" className="mb-[4px]" />
      삭제
    </button>
  )
}
