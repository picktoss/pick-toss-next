import Image from 'next/image'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from './ui/dialog'

import { ReactNode } from 'react'
import icons from '@/constants/icons'
import ProTag from './pro-tag'
import { Button } from './ui/button'

interface Props {
  trigger?: ReactNode
  confirm?: () => void
  defaultOpen?: boolean
}

export function LimitDocumentDialog({ trigger, confirm, defaultOpen = false }: Props) {
  return (
    <Dialog
      defaultOpen={defaultOpen}
      onOpenChange={(value) => {
        if (value === false) {
          confirm?.()
        }
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="w-[320px] lg:w-[448px]" displayCloseButton={false}>
        <div className="mb-[16px] text-center text-body1-bold text-orange-06">
          노트 창고 용량이 모두 찼습니다
        </div>
        <div className="mb-[4px] bg-gradient-to-r from-[#93B0FF] to-[#FF8428] bg-clip-text text-center text-h2-bold-eng text-transparent">
          Coming Soon
        </div>
        <div className="mb-[24px] text-center text-text-medium text-gray-08">
          더 다양한 기능의 픽토스 pro를 만나보세요
        </div>
        <div className="mx-[10px] mb-[20px] flex h-[270px] flex-col items-center justify-center gap-[8px] rounded-[12px] bg-gray-01 lg:h-[180px] lg:flex-row lg:gap-[36px]">
          <Image src={icons.logo} alt="logo" />
          <div>
            <div className="mb-[10px] flex items-center">
              <Image src={icons.logoTitle} alt="logo-title" />
              <ProTag />
            </div>
            <ul className="text-text-regular text-gray-09">
              <li> • 퀴즈 저장 가능</li>
              <li> • 주차별 복습 세트 생성</li>
              <li> • 별 무제한</li>
              <li> • 노트 창고 용량 확장</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center">
          <DialogClose asChild className="w-full">
            <Button className="w-full lg:w-[280px]" onClick={() => confirm?.()}>
              확인
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
