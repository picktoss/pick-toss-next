import Image from 'next/image'
import mobileNightSkySource from '../assets/mobile-night-sky.png'
import { Button } from '@/components/ui/button'
import { GoogleIcon, KakaoIcon } from '../svgs'
import { signIn } from '@/app/api/auth/[...nextauth]/auth'

export function Footer() {
  return (
    <div className="relative mt-[184px] flex h-[870px] w-full flex-col justify-end">
      <Image src={mobileNightSkySource} fill alt="" />
      <div className="z-10 px-[20px] pb-[56px]">
        <div className="flex items-center gap-[8px]">
          <span className="text-h3-bold-eng text-orange-06">Q</span>
          <span className="mt-[4px] text-h4-bold text-gray-09">
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
            <Button
              variant="outline"
              className="w-full justify-start gap-[16px] rounded-[12px] border-[1.5px] border-gray-02 p-[12px] !text-text-medium text-gray-08"
            >
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
            <Button
              variant="outline"
              className="w-full justify-start gap-[16px] rounded-[12px] border-[1.5px] border-gray-02 p-[12px] !text-text-medium text-gray-08"
            >
              <KakaoIcon />
              카카오로 시작하기
            </Button>
          </form>
        </div>

        <p className="mt-[32px] text-center text-[14px] leading-[120%] text-gray-07">
          ⓒ 2024. picktoss all rights reserved
        </p>
      </div>
    </div>
  )
}
