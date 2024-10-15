import Image from 'next/image'
import mobileSkySource from '../assets/mobile-sky.png'
import desktopSkySource from '../assets/desktop-sky.png'
import { Button } from '@/shared/components/ui/button'
import { ArrowRightIcon, DocumentIcon, LightningIcon, LogoTextIcon } from '../svgs'
import { BounceChevronDown } from './ui/bounce-chevron-down'
import { LoginDialog } from './login-dialog'

export function Intro() {
  return (
    <div className="relative flex h-[calc(100vh-60px)] w-full flex-col justify-between pt-[128.5px] xl:pt-[146px]">
      <Image src={mobileSkySource} fill alt="" className="xl:hidden" />
      <Image src={desktopSkySource} fill alt="" className="hidden xl:block" />
      <div className="z-40">
        <div className="text-h2-bold text-gray-09 text-center xl:text-[64px]">
          나의{'\u00A0'}
          {'\u00A0'}
          <span className="text-blue-06">
            <DocumentIcon className="mb-[9px] inline-block size-[24px] xl:mb-[13px] xl:size-[47px]" />
            <span>{'\u00A0'}노트</span>
          </span>
          에서 출발해
          <br />
          매일 도착하는{'\u00A0'}
          {'\u00A0'}
          <span className="text-orange-06">
            <LightningIcon className="mb-[5px] inline-block h-[28px] w-[12.7px] xl:mb-[9px] xl:h-[56.6px] xl:w-[25.5px]" />
            <span>{'\u00A0'}퀴즈</span>
          </span>
        </div>

        <div className="text-text-medium text-gray-08 xl:text-h4-medium mt-[16px] h-[61px] text-center xl:mt-[32px]">
          내가 등록한 노트로부터 만들어진 퀴즈를 풀며
          <br />
          매일 5분으로 배운 것들을 나의 것으로 만들어보세요
        </div>

        <div className="mt-[33px] flex justify-center xl:mt-[64px]">
          <LoginDialog
            trigger={
              <Button className="!text-body1-bold flex h-[52px] w-[190px] gap-[8px] rounded-[32px] text-white xl:w-[240px]">
                <div>픽토스 시작하기</div>
                <ArrowRightIcon />
              </Button>
            }
          />
        </div>
      </div>

      <div className="z-40 flex flex-col items-center gap-[5.8px] pb-[30px]">
        <LogoTextIcon className="xl:h-[28.4px] xl:w-[111px]" />
        <BounceChevronDown className="xl:h-[35px] xl:w-[32px]" />
      </div>
    </div>
  )
}
