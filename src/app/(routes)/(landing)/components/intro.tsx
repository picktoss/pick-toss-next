import Image from 'next/image'
import mobileSkySource from '../assets/mobile-sky.png'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon, LogoTextIcon } from '../svgs'
import { BounceChevronDown } from './ui/bounce-chevron-down'

export function Intro() {
  return (
    <div className="relative flex h-[calc(100vh-60px)] w-full flex-col justify-between pt-[128.5px]">
      <Image src={mobileSkySource} fill alt="" />
      <div className="z-40">
        <div className="text-center text-h2-bold text-gray-09">
          나의 <span className="text-blue-06">노트</span>에서 출발해
          <br />
          매일 도착하는 <span className="text-orange-06">퀴즈</span>
        </div>

        <div className="mt-[16px] h-[61px] text-center">
          내가 등록한 노트로부터 만들어진 퀴즈를 풀며
          <br />
          매일 5분으로 배운 것들을 나의 것으로 만들어보세요
        </div>

        <div className="mt-[33px] flex justify-center">
          <Button
            variant="gradation"
            className="flex h-[52px] w-[190px] gap-[8px] rounded-[32px] !text-body1-bold text-white"
          >
            <div>픽토스 시작하기</div>
            <ArrowRightIcon />
          </Button>
        </div>
      </div>

      <div className="z-40 flex flex-col items-center gap-[5.8px] pb-[30px]">
        <LogoTextIcon />
        <BounceChevronDown />
      </div>
    </div>
  )
}
