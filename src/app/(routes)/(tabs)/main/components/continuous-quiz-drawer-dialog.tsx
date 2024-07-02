'use client'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import icons from '@/constants/icons'
import { useMediaQuery } from '@/hooks/use-media-query'
import Image from 'next/image'
import { ReactNode, useState } from 'react'

interface ContinuousQuizDrawerDialog {
  continuousQuizDatesCount: number
  maxContinuousQuizDatesCount: number
  trigger: ReactNode
}

export default function ContinuousQuizDrawerDialog({
  trigger,
  continuousQuizDatesCount,
  maxContinuousQuizDatesCount,
}: ContinuousQuizDrawerDialog) {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="min-w-[560px] pb-[65px] pt-[26px]">
          <ContinuousQuizContent
            continuousQuizDatesCount={continuousQuizDatesCount}
            maxContinuousQuizDatesCount={maxContinuousQuizDatesCount}
          />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild className="cursor-pointer">
        {trigger}
      </DrawerTrigger>
      <DrawerContent className="min-h-[500px]">
        <ContinuousQuizContent
          continuousQuizDatesCount={continuousQuizDatesCount}
          maxContinuousQuizDatesCount={maxContinuousQuizDatesCount}
        />
      </DrawerContent>
    </Drawer>
  )
}

function ContinuousQuizContent({
  continuousQuizDatesCount,
  maxContinuousQuizDatesCount,
}: {
  continuousQuizDatesCount: number
  maxContinuousQuizDatesCount: number
}) {
  return (
    <div className="flex flex-col items-center bg-white lg:min-h-0">
      <div className="mb-[16px] mt-[34px] text-h4-bold text-gray-09 lg:mb-[19px] lg:mt-0">
        퀴즈 연속일
      </div>

      <div className="flex w-full flex-col items-center px-[20px]">
        <div className="mb-[8px] flex h-[40px] items-center gap-[16px]">
          <Image src={icons.calendar} width={32} height={32} alt="" />
          <span className="text-h2-bold text-gray-08">{continuousQuizDatesCount}일</span>
        </div>
        <div className="mb-[24px] text-center text-body2-medium text-gray-07">
          나의 최장 기록: {maxContinuousQuizDatesCount}일
        </div>
        <QuizCalendar />
      </div>
    </div>
  )
}

const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

function QuizCalendar() {
  const today = new Date()

  const thisMonth = today.getMonth() + 1
  const firstDayOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay()

  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)
  const lastDayOfThisMonth = new Date(Number(nextMonth) - 1).getDate()

  return (
    <div className="w-[335px] rounded-[12px] bg-gray-01 px-[20px] py-[18px]">
      <div className="mb-[19px] flex justify-center text-body1-bold text-gray-08">
        {thisMonth}월
      </div>
      <div className="grid grid-cols-7 gap-y-[20px] text-center">
        {days.map((day) => (
          <div key={day} className="text-small1-regular text-gray-06">
            {day}
          </div>
        ))}
        {Array.from({ length: firstDayOfThisMonth }).map((_, i) => (
          <div key={i} />
        ))}
        {Array.from({ length: lastDayOfThisMonth }, (_, i) => i + 1).map((date) => (
          <div key={date} className="text-body2-medium text-gray-08">
            {date}
          </div>
        ))}
      </div>
    </div>
  )
}
