'use client'

import { Button } from '@/shared/components/ui/button'
import Text from '@/shared/components/ui/text'
import { useDynamicThemeColor } from '@/shared/hooks/use-dynamic-theme-color'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { isMobile } from 'react-device-detect'

export default function NotFound() {
  useDynamicThemeColor(isMobile, '#F5F7F9', '#FFFFFF')

  const router = useRouter()

  return (
    <div className="center flex-center h-dvh w-dvw max-w-mobile flex-col bg-background-base-02">
      <Image src={'/images/not-found.png'} alt="" width={133} height={119} />

      <div className="mt-[22.4px] flex flex-col items-center gap-[10px] lg:mt-[15.7px] lg:gap-[16px] lg:py-0">
        <Text typography="title3">페이지를 찾을 수 없어요</Text>
        <Text typography="text1-medium" color="sub" className="px-[45px] text-center">
          존재하지 않는 주소를 입력했거나, 요청하신 페이지의 <br /> 주소가 변경, 삭제되어 찾을 수
          없습니다.
        </Text>
      </div>

      <Button onClick={() => router.back()} variant={'mediumRound'} className="mt-[48px]">
        이전 페이지로 돌아가기
      </Button>
    </div>
  )
}
