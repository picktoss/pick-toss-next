'use client'

import icons from '@/constants/icons'
import Image from 'next/image'
import { BlackLottie, MultipleLottie, OXLottie } from './lotties'

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
        <div className="w-full rounded-[12px]">
          <div className="flex h-[120px] items-center justify-center bg-blue-01">
            <MultipleLottie />
          </div>
          <div className="bg-white px-[24px] pb-[18px] pt-[16px]">
            <div className="flex items-center gap-[8px] text-h4-bold text-gray-09">객관식</div>
            <div className="text-body2-medium text-gray-06">
              <span>4가지 선택지 중 정답을 고르는 퀴즈</span>
            </div>
          </div>
        </div>
        <div className="w-full rounded-[12px]">
          <div className="flex h-[120px] items-center justify-center bg-blue-01">
            <OXLottie />
          </div>
          <div className="bg-white px-[24px] pb-[18px] pt-[16px]">
            <div className="flex items-center gap-[8px] text-h4-bold text-gray-09">O/X</div>
            <div className="text-body2-medium text-gray-06">
              <span>참인지 거짓인지 판단하는 양자택일 퀴즈</span>
            </div>
          </div>
        </div>
        <div className="w-full rounded-[12px]">
          <div className="flex h-[120px] items-center justify-center bg-blue-01">
            <BlackLottie />
          </div>
          <div className="bg-white px-[24px] pb-[18px] pt-[16px]">
            <div className="flex items-center gap-[8px] text-h4-bold text-gray-09">
              <span>빈칸 채우기</span>
              <span className="block h-fit rounded-[3px] bg-gray-02 px-[6px] pb-[2px] pt-px text-[10px] text-gray-08">
                Coming soon
              </span>
            </div>
            <div className="text-body2-medium text-gray-06">주어진 문장의 빈 곳을 채우는 퀴즈</div>
          </div>
        </div>
      </div>
    </section>
  )
}
