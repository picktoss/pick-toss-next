'use client'

import Loading from '@/shared/components/loading'
import { Dialog, DialogContent, DialogTrigger } from '@/shared/components/ui/dialog'
import { Drawer, DrawerContent, DrawerTrigger } from '@/shared/components/ui/drawer'
import icons from '@/constants/icons'
import { useAmplitudeContext } from '@/shared/hooks/use-amplitude-context'
import { useMediaQuery } from '@/shared/hooks/use-media-query'
import { cn } from '@/shared/lib/utils'
import Image from 'next/image'
import { ReactNode, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { queries } from '@/shared/lib/tanstack-query/query-keys'

interface ContinuousQuizDrawerDialog {
  continuousQuizDatesCount: number
  maxContinuousQuizDatesCount: number
  trigger: ReactNode
}

// ContinuousQuizDrawerDialog 컴포넌트
const ContinuousQuizDrawerDialog = ({
  trigger,
  continuousQuizDatesCount,
  maxContinuousQuizDatesCount,
}: ContinuousQuizDrawerDialog) => {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const { clickedEvent } = useAmplitudeContext()

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          asChild
          onClick={() =>
            clickedEvent({
              buttonType: 'continuousQuizDates',
              buttonName: 'continuous_quiz_dates_dialog_trigger',
            })
          }
        >
          {trigger}
        </DialogTrigger>
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
      <DrawerTrigger
        asChild
        className="cursor-pointer"
        onClick={() =>
          clickedEvent({
            buttonType: 'continuousQuizDates',
            buttonName: 'continuous_quiz_dates_drawer_dialog_trigger',
          })
        }
      >
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

export default ContinuousQuizDrawerDialog

// ContinuousQuizDrawerDialog 내부에서 사용되는 컴포넌트들
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

  const { data } = useQuery(
    queries.quiz.monthAnswerRate({
      categoryId: 0,
      date: {
        year: 2024,
        month: thisMonth,
      },
    })
  )

  if (!data) {
    return (
      <div className="relative h-[274.7px] w-[332px] rounded-[12px] bg-gray-01">
        <Loading center />
      </div>
    )
  }

  return (
    <div className="rounded-[12px] bg-gray-01 px-[20px] py-[18px]">
      <div className="mb-[19px] flex justify-center text-body1-bold text-gray-08">
        {thisMonth}월
      </div>
      <div className="grid grid-cols-7 gap-x-[16px] gap-y-[9px] text-center">
        {days.map((day) => (
          <div key={day} className="w-[28px] text-small1-regular text-gray-06">
            {day}
          </div>
        ))}
        {Array.from({ length: firstDayOfThisMonth }).map((_, i) => (
          <div key={i} />
        ))}
        {data.quizzes.map((quiz, idx) => (
          <div
            key={idx}
            className={cn(
              'flex size-[28px] items-center justify-center rounded-full text-body2-medium text-gray-08',
              quiz.totalQuizCount > 0 && 'bg-orange-01'
            )}
          >
            {idx + 1}
          </div>
        ))}
      </div>
    </div>
  )
}
