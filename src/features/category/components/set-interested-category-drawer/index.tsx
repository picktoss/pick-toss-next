'use client'

import { CATEGORY_OPTION } from '@/constants'
import { Button } from '@/shared/components/ui/button'
import { Checkbox } from '@/shared/components/ui/checkbox'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/components/ui/drawer'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import React, { useState } from 'react'
import SetCategoryCompleteDialog from '../set-category-complete-dialog'

// todo : 관심분야 최대 2개까지 체크할 수 있도록 제한
const SetInterestedCategoryDrawer = ({
  triggerComponent,
}: {
  triggerComponent: React.ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>{triggerComponent}</DrawerTrigger>

        <DrawerContent
          overlayProps={{ className: 'max-w-mobile mx-auto' }}
          className="mx-auto flex h-[80dvh] w-dvw max-w-mobile flex-col rounded-t-[16px]"
        >
          <div className="mt-[20px] flex h-[calc(100%-100px-32px)] flex-col px-[17px]">
            <header className="mb-[14px]">
              <DrawerTitle className="mb-[8px] text-title3">관심분야 선택</DrawerTitle>
              <Text typography="text1-medium" className="text-text-sub">
                최대 2개까지 선택 가능해요
              </Text>
            </header>

            <div className="flex grow flex-col overflow-y-auto">
              {CATEGORY_OPTION.map((category, index) => (
                <label
                  htmlFor={category.key}
                  key={category.key}
                  className={cn(
                    'flex cursor-pointer items-center py-[10px]',
                    index === CATEGORY_OPTION.length - 1 && 'mb-[28px]'
                  )}
                >
                  <Checkbox id={category.key} className="mr-[12px] size-[20px]" />
                  <Text>{category.label}</Text>
                </label>
              ))}
            </div>
          </div>

          <DrawerFooter className="flex-center w-full flex-row gap-[6px] px-[16px] pb-[36px] pt-[12px]">
            <Button
              variant={'largeRound'}
              colors={'tertiary'}
              className="w-[35%] px-[35.5px] py-[15px]"
            >
              초기화
            </Button>

            {/* 눌렀을 때 데이터를 서버로 보내고, 처리가 완료되면 성공 dialog 노출? */}
            <Button
              onClick={() => setIsOpen(true)}
              variant={'largeRound'}
              colors={'primary'}
              className="w-[65%] px-[78px] py-[15px]"
            >
              저장하기
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <SetCategoryCompleteDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}

export default SetInterestedCategoryDrawer
