'use client'

import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog'
import { signIn } from 'next-auth/react'
import { ReactNode } from 'react'

interface Props {
  trigger: ReactNode
}

export function LoginDialog({ trigger }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        displayCloseButton={false}
        className="w-[335px] max-w-[560px] !rounded-[12px] border-none py-[26px] lg:w-[560px]"
      >
        <DialogHeader className="!text-center">
          <DialogTitle className="!text-h4-bold text-gray-09">픽토스 시작하기</DialogTitle>
          <DialogDescription className="!text-small1-regular text-gray-07 lg:!text-text-medium !mt-[8px]">
            간편 로그인으로 3초만에 픽토스를 시작해보세요
          </DialogDescription>
        </DialogHeader>

        <div className="mt-[51px] flex flex-col items-center lg:mt-[36px]">
          <Button
            className="border-gray-02 !text-body2-medium h-[48px] w-full max-w-[328px] gap-[12px] rounded-[6px]"
            onClick={() => signIn('google')}
          >
            <GoogleIcon />
            <div>Google로 로그인</div>
          </Button>
          <Button
            className="!text-body2-medium mt-[14px] h-[48px] w-full max-w-[328px] gap-[16px] rounded-[6px] bg-[#FBE44D] text-[#3C1E1E] hover:bg-[#FBE44D]/80"
            onClick={() => signIn('kakao')}
          >
            <KakaoIcon />
            <div>카카오로 로그인</div>
          </Button>
        </div>

        <p className="text-tag-eng text-gray-06 mt-[21px] text-center lg:mt-[30px] lg:pb-[24px]">
          로그인 시 <span className="underline underline-offset-2">개인정보보호 정책</span> 및{' '}
          <span className="underline underline-offset-2">서비스 이용약관</span>에 동의하는 것으로
          <br />
          간주하며, 서비스 이용을 위해 이메일과 이름을 수집합니다.
        </p>
      </DialogContent>
    </Dialog>
  )
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18.1711 8.36794H17.4998V8.33335H9.99984V11.6667H14.7094C14.0223 13.6071 12.1761 15 9.99984 15C7.23859 15 4.99984 12.7613 4.99984 10C4.99984 7.23877 7.23859 5.00002 9.99984 5.00002C11.2744 5.00002 12.434 5.48085 13.3169 6.26627L15.674 3.90919C14.1857 2.5221 12.1948 1.66669 9.99984 1.66669C5.39775 1.66669 1.6665 5.39794 1.6665 10C1.6665 14.6021 5.39775 18.3334 9.99984 18.3334C14.6019 18.3334 18.3332 14.6021 18.3332 10C18.3332 9.44127 18.2757 8.89585 18.1711 8.36794Z"
        fill="#FFC107"
      />
      <path
        d="M2.62744 6.12127L5.36536 8.12919C6.10619 6.29502 7.90036 5.00002 9.99994 5.00002C11.2745 5.00002 12.4341 5.48085 13.317 6.26627L15.6741 3.90919C14.1858 2.5221 12.1949 1.66669 9.99994 1.66669C6.79911 1.66669 4.02327 3.47377 2.62744 6.12127Z"
        fill="#FF3D00"
      />
      <path
        d="M9.9998 18.3333C12.1523 18.3333 14.1081 17.5096 15.5869 16.17L13.0077 13.9875C12.1429 14.6451 11.0862 15.0008 9.9998 15C7.8323 15 5.99189 13.6179 5.29855 11.6891L2.58105 13.7829C3.96022 16.4816 6.76105 18.3333 9.9998 18.3333Z"
        fill="#4CAF50"
      />
      <path
        d="M18.1713 8.3679H17.5V8.33331H10V11.6666H14.7096C14.3809 12.5902 13.7889 13.3971 13.0067 13.9879L13.0079 13.9871L15.5871 16.1696C15.4046 16.3354 18.3333 14.1666 18.3333 9.99998C18.3333 9.44123 18.2758 8.89581 18.1713 8.3679Z"
        fill="#1976D2"
      />
    </svg>
  )
}

function KakaoIcon() {
  return (
    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.4998 2.82691C5.52989 2.82691 1.5 5.92277 1.5 9.74398C1.5 12.1985 3.16912 14.3535 5.67575 15.5835L4.82773 18.6634C4.79528 18.758 4.82219 18.8581 4.89263 18.9263C4.94113 18.9738 5.00585 19 5.0761 19C5.13032 19 5.18416 18.979 5.23284 18.9422L8.87919 16.5453C9.40877 16.6189 9.94904 16.6609 10.4998 16.6609C15.4697 16.6609 19.5 13.5652 19.5 9.74398C19.5 5.92277 15.4697 2.82691 10.4998 2.82691Z"
        fill="#3C1E1E"
      />
    </svg>
  )
}
