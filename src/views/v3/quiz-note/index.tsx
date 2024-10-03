'use client'

import { cn } from '@/shared/lib/utils'
import Header from './components/header'
import note_img from './assets/note.png'
import Image from 'next/image'
import AnimatedButtons from './components/animate-buttons'
import { useState } from 'react'
import Text from '@/shared/components/text'
import DimmedBackground from './components/dimmed-background'

const isDesktop = false

const QuizNote = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className={cn(
        'flex flex-col h-screen w-screen text-text-primary',
        isDesktop && 'max-w-[430px]'
      )}
    >
      <div className="flex grow flex-col bg-background-base-02 px-[14px]">
        <Header />
        <div className="flex-center grow">
          {/* 노트가 하나도 없을 경우 아래 렌더링 */}
          <div className="flex-center relative size-[202px] flex-col">
            <Image src={note_img} alt="노트 작성" objectPosition="center" width={100} />
            <div className="flex-center mx-[12px] grow flex-col">
              <h3 className="mb-[8px] text-title3">노트를 등록해보세요</h3>
              <Text as="p" typography="text1-medium" className="text-center text-text-sub">
                직접 추가하거나 연동한 노트에서 <br /> 퀴즈를 만들 수 있어요
              </Text>
            </div>
          </div>

          {/* 노트 리스트 렌더링 */}
          <></>
        </div>

        <AnimatedButtons isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        <DimmedBackground isExpanded={isExpanded} />
      </div>
      <div className="h-[88px] w-full bg-background-base-01"></div>
    </div>
  )
}

export default QuizNote
