'use client'

import icons from '@/constants/icons'
import Image from 'next/image'
import { BlackLottie, MultipleLottie, OXLottie } from './lotties'
import { ReactNode } from 'react'

export default function QuizMaker() {
  return (
    <section className="flex flex-col gap-[24px]">
      <div>
        <div className="flex gap-[8px]">
          <div className="text-h4-bold text-gray-08">퀴즈 만들기</div>
          <Image src={icons.circleQuestion} width={20} height={20} alt="" />
        </div>
        <div className="text-body2-regular text-gray-07">
          원하는 노트에서 퀴즈를 만들고 풀어보세요
        </div>
      </div>

      <div className="flex flex-col gap-[16px] lg:flex-row">
        <MakerTrigger
          title="객관식"
          description="4가지 선택지 중 정답을 고르는 퀴즈"
          lottie={<MultipleLottie />}
        />
        <MakerTrigger
          title="O/X"
          description="참인지 거짓인지 판단하는 양자택일 퀴즈"
          lottie={<OXLottie />}
        />
        <MakerTrigger
          title="빈칸 채우기"
          description="주어진 문장의 빈 곳을 채우는 퀴즈"
          comingSoon
          lottie={<BlackLottie />}
        />
      </div>
    </section>
  )
}

function MakerTrigger({
  lottie,
  title,
  description,
  comingSoon,
}: {
  lottie: ReactNode
  title: string
  description: string
  comingSoon?: boolean
}) {
  return (
    <div className="w-full overflow-hidden rounded-[12px]">
      <div className="flex h-[120px] items-center justify-center bg-blue-01 lg:h-[180px]">
        {lottie}
      </div>
      <div className="flex h-[80px] flex-col justify-center gap-[4px] bg-white px-[24px] lg:h-[100px] lg:gap-[8px]">
        <div className="flex items-center gap-[8px] text-h4-bold text-gray-09">
          <span>{title}</span>
          {comingSoon && (
            <span className="block h-fit rounded-[3px] bg-gray-02 px-[6px] pb-[2px] pt-px text-[10px] text-gray-08">
              Coming soon
            </span>
          )}
        </div>
        <div className="text-body2-medium text-gray-06">
          <span>{description}</span>
        </div>
      </div>
    </div>
  )
}
