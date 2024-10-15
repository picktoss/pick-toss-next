'use client'

import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/shared/components/ui/drawer'
import Text from '@/shared/components/ui/text'
import { useState } from 'react'

// NewQuizDrawer 컴포넌트
const NewQuizDrawer = ({ triggerComponent }: { triggerComponent: JSX.Element }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>{triggerComponent}</DrawerTrigger>

      <DrawerContent className="rounded-t-[16px]">
        <div className="my-[24px] flex h-[75dvh] flex-col items-center px-[16px]">
          <DrawerTitle className="mb-[38px] w-full font-suit text-title3">
            원하는 유형과 문제 수를 선택해주세요
          </DrawerTitle>

          <div className="mb-[28px] flex gap-[8px]">
            <div className="h-[136px] w-[168px] rounded-[16px] border"></div>
            <div className="h-[136px] w-[168px] rounded-[16px] border"></div>
          </div>

          <div className="flex h-fit w-full flex-col border-t pb-[66px] pt-[26px]">
            <Text>만들 문제</Text>
            <Text>10 문제</Text>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default NewQuizDrawer
