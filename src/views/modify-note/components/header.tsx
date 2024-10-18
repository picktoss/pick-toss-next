'use client'

import Icon from '@/shared/components/icon'
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/shared/components/ui/dialog'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const Header = () => {
  const router = useRouter()
  const [isOpenCancel, setIsOpenCancel] = useState(false)

  return (
    <>
      <header>
        <div
          className={cn(
            'fixed right-1/2 top-0 z-20 flex h-[54px] w-full max-w-mobile translate-x-1/2 bg-background-base-01 px-[16px]'
          )}
        >
          <div className="flex size-full items-center justify-between">
            <button onClick={() => setIsOpenCancel(true)}>
              <Icon name="cancel" className="size-[24px]" />
            </button>

            <div className="rounded-full bg-background-base-02 px-[16px] py-[5px] text-text1-medium">
              📊 전공 공부
            </div>

            <button className="text-button2 text-button-text-primary">저장</button>
          </div>
        </div>
      </header>

      <Dialog open={isOpenCancel} onOpenChange={setIsOpenCancel}>
        <DialogContent
          className="flex min-h-[170px] w-[280px] flex-col items-center justify-between rounded-[16px] bg-background-base-01"
          displayCloseButton={false}
        >
          <DialogTitle className="mb-[16px] w-full text-subtitle2-bold">
            수정을 취소할까요?
          </DialogTitle>

          <Text
            typography="text1-medium"
            className="flex h-fit w-full whitespace-nowrap text-text-secondary"
          >
            지금까지 수정한 내용은 저장되지 않습니다.
          </Text>

          <div className="mt-[40px] flex w-full justify-end text-button2">
            <DialogClose asChild>
              <button className="p-[4px] text-button-text-tertiary">계속하기</button>
            </DialogClose>
            <DialogClose asChild>
              <button
                onClick={() => router.back()}
                className="ml-[21px] p-[4px] text-button-text-primary"
              >
                수정 취소
              </button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Header
