'use client'

import Icon from '@/shared/components/custom/icon'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog'
import Text from '@/shared/components/ui/text'
import { useState } from 'react'

const SetNameDialog = () => {
  const [name, setName] = useState('픽토스') // 유저 정보에서 이름 가져오기

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex w-full cursor-pointer items-center justify-between">
          <div className="flex flex-col items-start gap-[4px]">
            <Text typography="text2-medium" className="text-text-sub">
              이름
            </Text>
            <Text typography="subtitle2-medium">픽토스</Text>
          </div>
          <Icon name="chevron-right" className="size-[16px] text-icon-tertiary" />
        </div>
      </DialogTrigger>

      <DialogContent
        displayCloseButton={false}
        className="h-fit w-[280px] rounded-[16px] bg-background-base-01 p-[24px] pb-[32px]"
      >
        <div>
          <DialogTitle className="mb-[38px]">
            <Text typography="subtitle2-bold">이름 변경</Text>
          </DialogTitle>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-[53px] w-full border-b border-border-divider py-[5px] text-subtitle2-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-background-disabled disabled:opacity-50 disabled:placeholder:text-text-disabled"
          />

          <div className="flex items-center justify-end gap-[35px] text-button2">
            <DialogClose>
              <span className="text-button-text-tertiary">취소</span>
            </DialogClose>
            <DialogClose>
              <span className="text-button-text-primary">저장하기</span>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SetNameDialog
