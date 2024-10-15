import Image from 'next/image'
import mobileNightSkySource from '../assets/mobile-night-sky.png'
import desktopNightSkySource from '../assets/desktop-night-sky.png'
import { Button } from '@/shared/components/ui/button'
import { GoogleIcon, KakaoIcon, PicktossIcon } from '../svgs'
import { signIn } from '@/app/api/auth/[...nextauth]/auth'

export function Footer() {
  return (
    <>
      <div className="relative mt-[184px] flex h-[870px] w-full flex-col justify-between xl:hidden">
        <Image src={mobileNightSkySource} fill alt="" />
        <div className="z-10 flex flex-col items-center pt-[162px]">
          <PicktossIcon />
          <div className="text-h3-bold text-gray-02 mt-[16px] text-center">
            매일 유성처럼 나에게 도착하는
            <br />
            퀴즈를 받아보세요
          </div>
        </div>

        <div className="z-10 px-[20px] pb-[56px]">
          <div className="flex items-center gap-[8px]">
            <span className="text-h3-bold-eng text-orange-06">Q</span>
            <span className="text-h4-bold text-gray-09 mt-[4px]">
              픽토스를 어떻게 시작하시겠어요?
            </span>
          </div>

          <div className="mt-[22px] flex flex-col gap-[8px]">
            <form
              action={async () => {
                'use server'
                await signIn('google')
              }}
            >
              <Button className="border-gray-02 !text-text-medium text-gray-08 w-full justify-start gap-[16px] rounded-[12px] border-[1.5px] p-[12px]">
                <GoogleIcon />
                구글로 시작하기
              </Button>
            </form>
            <form
              action={async () => {
                'use server'
                await signIn('kakao')
              }}
            >
              <Button className="border-gray-02 !text-text-medium text-gray-08 w-full justify-start gap-[16px] rounded-[12px] border-[1.5px] p-[12px]">
                <KakaoIcon />
                카카오로 시작하기
              </Button>
            </form>
          </div>

          <p className="text-gray-07 mt-[32px] text-center text-[14px] leading-[120%]">
            ⓒ 2024. picktoss all rights reserved
          </p>
        </div>
      </div>

      <div className="relative mt-[181px] hidden h-[1346px] w-full flex-col justify-between xl:flex">
        <Image src={desktopNightSkySource} fill alt="" />
        <div className="z-10 flex flex-col items-center pt-[364px]">
          <PicktossIcon svgKey="desktop-picktoss" className="size-[120px]" />
          <div className="text-h1 text-gray-02 mt-[35px] text-center">
            매일 유성처럼 나에게 도착하는 퀴즈를 받아보세요
          </div>
        </div>

        <div className="z-10 mx-auto">
          <div className="flex items-center justify-center gap-[8px]">
            <span className="text-h2-bold-eng text-orange-06">Q</span>
            <span className="text-h3-bold text-gray-09 mt-[4px]">
              픽토스를 어떻게 시작하시겠어요?
            </span>
          </div>

          <div className="mt-[32px] flex flex-col items-center gap-[8px]">
            <form
              action={async () => {
                'use server'
                await signIn('google')
              }}
            >
              <Button className="border-gray-02 !text-text-medium text-gray-08 w-[335px] justify-start gap-[16px] rounded-[12px] border-[1.5px] p-[12px]">
                <GoogleIcon />
                구글로 시작하기
              </Button>
            </form>
            <form
              action={async () => {
                'use server'
                await signIn('kakao')
              }}
            >
              <Button className="border-gray-02 !text-text-medium text-gray-08 w-[335px] justify-start gap-[16px] rounded-[12px] border-[1.5px] p-[12px]">
                <KakaoIcon />
                카카오로 시작하기
              </Button>
            </form>
          </div>

          <p className="text-gray-07 mt-[32px] pb-[121px] text-center text-[14px] leading-[120%]">
            ⓒ 2024. picktoss all rights reserved
          </p>

          <div className="z-10 flex h-[54px] w-[1032px] justify-end">
            <div className="text-body2-regular text-gray-06 flex items-center gap-[40px] pr-[20px]">
              <div>개인 정보 보호 정책</div>
              <div>서비스 이용약관</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
