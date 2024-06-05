'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import icons from '@/constants/icons'
import { useMediaQuery } from '@/hooks/use-media-query'
import Image from 'next/image'
import { HTMLAttributes, ReactNode, useState } from 'react'

interface MyStarsDrawerDialog {
  stars: number
  continuousQuizDatesCount: number
  trigger: ReactNode
}

export default function MyStarsDrawerDialog({
  trigger,
  stars,
  continuousQuizDatesCount,
}: MyStarsDrawerDialog) {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="min-w-[560px] pb-[31px] pt-[26px]">
          <MyStarsContent stars={stars} continuousQuizDatesCount={continuousQuizDatesCount} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild className="cursor-pointer">
        {trigger}
      </DrawerTrigger>
      <DrawerContent className="min-h-[550px]">
        <MyStarsContent stars={stars} continuousQuizDatesCount={continuousQuizDatesCount} />
      </DrawerContent>
    </Drawer>
  )
}

function MyStarsContent({ stars }: { stars: number; continuousQuizDatesCount: number }) {
  /* TODO: continuousQuizDatesCount */

  return (
    <div className="flex flex-col items-center bg-white lg:min-h-0">
      <div className="mb-[16px] mt-[34px] text-h4-bold text-gray-09 lg:mb-[19px] lg:mt-0">
        나의 별
      </div>

      <div className="flex w-full flex-col items-center gap-[24px] px-[20px] lg:gap-[16px]">
        <div className="flex h-[40px] items-start gap-[16px]">
          <Image src={icons.star} width={32} height={32} alt="" />
          <span className="text-h2-bold text-gray-08">{stars}개</span>
        </div>

        <div className="px-[17px] text-center text-text-regular text-gray-07 lg:px-0">
          별 하나로 퀴즈 하나를 생성할 수 있습니다
          <br />
          오늘의 퀴즈를 풀 때마다 별 5개를 드리고, 5일 연속 퀴즈를 풀면 20개를 드려요
        </div>

        <div className="flex w-full max-w-[376px] justify-center rounded-[12px] bg-gray-01 pb-[28px] pt-[21px] text-small1-bold text-gray-07">
          <div className="relative mx-[20px] flex w-full max-w-[324px] justify-between overflow-hidden">
            <div className="absolute bottom-[20px] w-full border border-dashed" />

            <div className="flex flex-col items-center gap-[8px]">
              <div>1일차</div>
              <div className="z-10 flex size-[40px] items-center justify-center rounded-full bg-gray-02">
                +5
              </div>
            </div>
            <div className="flex flex-col items-center gap-[8px]">
              <div>2일차</div>
              <div className="z-10 flex size-[40px] items-center justify-center rounded-full bg-gray-02">
                +5
              </div>
            </div>
            <div className="flex flex-col items-center gap-[8px]">
              <div>3일차</div>
              <div className="z-10 flex size-[40px] items-center justify-center rounded-full bg-gray-02">
                +5
              </div>
            </div>
            <div className="flex flex-col items-center gap-[8px]">
              <div>4일차</div>
              <div className="z-10 flex size-[40px] items-center justify-center rounded-full bg-gray-02">
                +5
              </div>
            </div>
            <div className="flex flex-col items-center gap-[8px]">
              <div>5일차</div>
              <div className="z-10 flex size-[40px] items-center justify-center rounded-full bg-gray-02">
                +20
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[48px] flex w-full flex-col items-center gap-[32px] px-[20px] lg:mt-[32px] lg:gap-[24px]">
        <div className="relative flex h-[17px] w-full justify-center">
          <div className="center absolute h-px w-full rounded-full bg-gray-02" />
          <div className="z-10 bg-white px-[12px] text-body2-medium text-orange-05">
            더 많은 별을 얻고 싶다면?
          </div>
        </div>
        <div className="flex w-full justify-center gap-[16px]">
          <Button className="relative h-[40px] w-[160px] bg-blue-01 !text-body2-bold text-blue-06 hover:bg-blue-01">
            <div>친구 초대하기</div>
            <Tag label="+20개" className="absolute right-[-14px] top-[-8px]" />
          </Button>
          <Button className="relative h-[40px] w-[160px] bg-blue-01 !text-body2-bold text-blue-06 hover:bg-blue-01">
            <div>광고 보고 받기</div>
            <Tag label="+5개" className="absolute right-[-14px] top-[-8px]" />
          </Button>
        </div>
      </div>
    </div>
  )
}

interface TagProps extends HTMLAttributes<HTMLDivElement> {
  label: string
}

function Tag({ className, label }: TagProps) {
  return (
    <div className={className}>
      <div className="flex rounded-[10px] rounded-bl-none bg-orange-05 px-[8px] py-[4px] text-tag text-gray-01">
        {label}
      </div>
    </div>
  )
}

// 초기 사용자 회원 가입 완료 시,
// 연속 풀이 횟수 등
