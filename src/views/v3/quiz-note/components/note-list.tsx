'use client'

import { PropsWithChildren } from 'react'
import { useQuizNoteContext } from '../context/quiz-note-context'
import Icon from '@/shared/components/v3/icon'

const NoteList = ({ children }: PropsWithChildren) => {
  const { isSelectMode } = useQuizNoteContext()

  return (
    <>
      <div className="mt-[78px] flex grow flex-col gap-[8px] overflow-x-hidden overflow-y-scroll scrollbar-hide">
        {children}
      </div>

      {isSelectMode && (
        <div className="fixed bottom-0 left-1/2 z-30 flex h-[86px] w-full max-w-[430px] -translate-x-1/2 flex-col bg-background-base-01">
          <div className="flex h-1/2 w-full items-center justify-between pl-[42px] pr-[64px] pt-[18px] text-text1-medium">
            <button
              className="flex-center text-text-secondary"
              onClick={() => alert('clicked move')}
            >
              <Icon name="move" className="mr-[8px]" />
              다른 폴더로 이동
            </button>
            <button
              className="flex-center text-text-critical"
              onClick={() => alert('clicked delete')}
            >
              <Icon name="bin" className="mr-[8px]" />
              노트 삭제
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default NoteList
