'use client'

import { useState } from 'react'
import { motion, PanInfo, useAnimation, useMotionValue } from 'framer-motion'
import Icon from '@/shared/components/icon'
import { useQuizNoteContext } from '../context/quiz-note-context'
import { cn } from '@/shared/lib/utils'
import { Checkbox } from '@/shared/components/ui/checkbox'
import MoveNoteDrawer from './move-note-drawer'
import Text from '@/shared/components/ui/text'
import Link from 'next/link'
import NoteTypeIcon from '@/views/shared/note-type-icon'

interface NoteProps {
  id: string
  createType: 'write' | 'file' | 'notion'
  title: string
  content: string
  quizCount: number
  characterCount: number
  folder: string
  className?: string
  reviewCount?: number
}

const SwipeableNoteCard = ({
  id,
  createType,
  title,
  content,
  quizCount,
  characterCount,
  folder,
  className,
  reviewCount,
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
    <Link
      href={'note/' + id}
      className={cn(
        `relative flex h-[104px] max-w-full items-center overflow-hidden rounded-[16px] bg-white px-[16px] pb-[20px] pt-[17px] shrink-0`,
        className
      )}
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
          <NoteTypeIcon
            type={createType}
            containerClassName="size-[36px]"
            iconClassName="size-[16px]"
          />
        )}

        <div className="ml-[16px] flex w-full flex-col">
          <div className="flex gap-[8px] items-center mb-[2px]">
            <h4 className="w-fit text-subtitle2-bold">{title}</h4>

            {reviewCount && (
              <div className="px-[6px] py-[2px] bg-button-fill-secondary rounded-[4px] text-button-label-secondary">
                <Text typography="caption-medium">복습 필요 {reviewCount}</Text>
              </div>
            )}
          </div>

          <Text
            as="p"
            typography="text1-regular"
            className="w-[calc(100%-55px)] truncate text-nowrap break-all text-text-sub"
          >
            {content}
          </Text>
          <Text typography="text2-medium" className="flex w-fit items-center text-text-sub">
            <span>{quizCount}문제</span>
            <Icon name="middle-dot" className="mx-[8px]" />
            <span>{characterCount}자</span>
            <Icon name="middle-dot" className="mx-[8px]" />
            <span className="flex items-center">
              <Icon name="folder-fill" className="mr-[2px] text-icon-tertiary" />
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
    </Link>
  )
}

export default SwipeableNoteCard

// NoteCard 내부에서 사용되는 컴포넌트
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
