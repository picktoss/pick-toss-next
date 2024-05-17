import icons from '@/constants/icons'
import Image from 'next/image'

export default function Achievements() {
  return (
    <div className="flex h-[80px] gap-[7px] lg:h-[248px] lg:flex-col lg:gap-[8px]">
      <div className="flex min-w-[164px] flex-1 justify-center gap-[26px] rounded-[12px] bg-white p-[16px] lg:justify-between lg:gap-0">
        <div className="flex flex-col gap-[4px]">
          <div className="text-body2-medium text-gray-08">퀴즈 연속일</div>
          <div className="text-h4-bold text-gray-08 lg:text-h3-bold">
            <span className="text-orange-06">25</span>일
          </div>
        </div>
        <div className="flex lg:h-full lg:items-end">
          <div className="relative size-[40px] lg:size-[48px]">
            <Image src={icons.calendar} fill alt="" className="absolute" />
          </div>
        </div>
      </div>
      <div className="flex min-w-[164px] flex-1 justify-center gap-[26px] rounded-[12px] bg-white p-[16px] lg:justify-between lg:gap-0">
        <div className="flex flex-col gap-[4px]">
          <div className="text-body2-medium text-gray-08">나의 별</div>
          <div className="text-h4-bold text-gray-08 lg:text-h3-bold">
            <span className="text-orange-06">16</span>개
          </div>
        </div>
        <div className="flex lg:h-full lg:items-end">
          <div className="relative size-[40px] lg:size-[48px]">
            <Image src={icons.star} fill alt="" className="absolute" />
          </div>
        </div>
      </div>
    </div>
  )
}