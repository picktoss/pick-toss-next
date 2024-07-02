'use client'

import icons from '@/constants/icons'
import Image from 'next/image'
import MyStarsDrawerDialog from './my-stars-drawer-dialog'
import { useSession } from 'next-auth/react'
import ContinuousQuizDrwaerDialog from './continuous-quiz-drawer-dialog'

export default function Achievements() {
  const { data: session } = useSession()
  const userDTO = session?.user.dto

  return (
    <div className="flex h-[80px] gap-[7px] lg:h-[248px] lg:flex-col lg:gap-[8px]">
      <ContinuousQuizDrwaerDialog
        continuousQuizDatesCount={userDTO!.continuousQuizDatesCount}
        maxContinuousQuizDatesCount={userDTO!.maxContinuousQuizDatesCount}
        trigger={
          <div className="flex min-w-[164px] flex-1 cursor-pointer justify-center gap-[26px] rounded-[12px] bg-white p-[16px] lg:justify-between lg:gap-0">
            <div className="flex shrink-0 flex-col gap-[4px]">
              <div className="text-body2-medium text-gray-08">퀴즈 연속일</div>
              <div className="text-h4-bold text-gray-08 lg:text-h3-bold">
                <span className="text-orange-06">{userDTO?.continuousQuizDatesCount}</span>일
              </div>
            </div>
            <div className="flex lg:h-full lg:items-end">
              <div className="relative size-[40px] lg:size-[48px]">
                <Image src={icons.calendar} fill alt="" className="absolute" />
              </div>
            </div>
          </div>
        }
      />

      <MyStarsDrawerDialog
        stars={userDTO!.point}
        continuousQuizDatesCount={userDTO!.continuousQuizDatesCount}
        trigger={
          <div className="flex min-w-[164px] flex-1 cursor-pointer justify-center gap-[26px] rounded-[12px] bg-white p-[16px] lg:justify-between lg:gap-0">
            <div className="flex shrink-0 flex-col gap-[4px]">
              <div className="text-body2-medium text-gray-08">나의 별</div>
              <div className="text-h4-bold text-gray-08 lg:text-h3-bold">
                <span className="text-orange-06">{userDTO?.point}</span>개
              </div>
            </div>
            <div className="flex lg:h-full lg:items-end">
              <div className="relative size-[40px] lg:size-[48px]">
                <Image src={icons.star} fill alt="" className="absolute" />
              </div>
            </div>
          </div>
        }
      />
    </div>
  )
}
