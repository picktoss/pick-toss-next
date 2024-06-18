'use client'

import { Button } from '@/components/ui/button'
import { LogoIcon, MenuIcon } from '../svgs'
import { useState } from 'react'
import { LoginDialog } from './login-dialog'

export function Header() {
  const [openMenu, setOpenMenu] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 flex h-[60px] items-center justify-between border-b border-gray-02 bg-white/50 px-[16px] backdrop-blur-md">
        <LogoIcon />
        <div className="flex items-center gap-[19px]">
          <LoginDialog
            trigger={
              <Button
                variant="gradation"
                className="h-[27px] w-[71px] !rounded-[16px] !text-small1-bold text-white"
              >
                로그인
              </Button>
            }
          />
          <Button variant="ghost" className="p-[4px]" onClick={() => setOpenMenu((prev) => !prev)}>
            <MenuIcon />
          </Button>
        </div>
      </header>
      {openMenu && (
        <div className="fixed top-[60px] z-50 w-full max-w-screen-md bg-white/50 pb-[23px] pt-[14px] text-body2-medium text-gray-08 backdrop-blur-md">
          <div role="button" className="w-fit px-[20px] py-[12px]">
            서비스 소개
          </div>
          <div role="button" className="w-fit px-[20px] py-[12px]">
            픽토스 소식
          </div>
          <div role="button" className="w-fit px-[20px] py-[12px]">
            구독 및 결제
          </div>
        </div>
      )}
    </>
  )
}
