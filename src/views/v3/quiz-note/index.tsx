'use client'

import { cn } from '@/shared/lib/utils'
import Header from './components/header'
import AnimatedButtons from './components/animate-buttons'
import { useState } from 'react'
import DimmedBackground from './components/dimmed-background'
import BottomNavigation from '@/shared/components/bottom-navigation'
import NoteCard from './components/note-card'
import { QuizNoteProvider } from './context/quiz-note-context'
import QuizNoteDialog from './components/quiz-note-dialog'
// import note_img from './assets/note.png'
// import Image from 'next/image'
// import Text from '@/shared/components/text'

// const isDesktop = true

const QuizNote = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className={cn('flex flex-col h-[calc(100vh-88px)] text-text-primary w-full')}>
      <QuizNoteProvider>
        <div className="flex grow flex-col bg-background-base-02 px-[14px]">
          <Header />

          {/* 노트가 하나도 없을 경우 아래 렌더링 */}
          {/* <div className="flex-center grow overflow-y-scroll pt-[108px]">
          <div className="flex-center relative size-[202px] flex-col">
            <Image src={note_img} alt="노트 작성" objectPosition="center" width={100} />
            <div className="flex-center mx-[12px] grow flex-col">
              <h3 className="mb-[8px] text-title3">노트를 등록해보세요</h3>
              <Text as="p" typography="text1-medium" className="text-center text-text-sub">
                직접 추가하거나 연동한 노트에서 <br /> 퀴즈를 만들 수 있어요
              </Text>
            </div>
          </div>
        </div> */}

          {/* 노트 리스트 렌더링 */}
          <div className="flex grow flex-col gap-[8px] overflow-x-hidden overflow-y-scroll pt-[132px] scrollbar-hide">
            {/* 리스트 길이만큼 map */}
            <NoteCard />
            <NoteCard />
          </div>

          <AnimatedButtons isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
          <DimmedBackground isExpanded={isExpanded} />

          <QuizNoteDialog />
        </div>
      </QuizNoteProvider>
      <BottomNavigation />
    </div>
  )
}

export default QuizNote
