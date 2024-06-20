'use client'

import { Button } from '@/components/ui/button'
import { LogoIcon, MenuIcon } from '../svgs'
import { useState } from 'react'
import { LoginDialog } from './login-dialog'
import Link from 'next/link'

export function Header() {
  const [openMenu, setOpenMenu] = useState(false)

  return (
    <div className="sticky top-0 z-50">
      <div className="xl:hidden">
        <header className="flex h-[60px] items-center justify-between border-b border-gray-02 bg-white/50 px-[16px] backdrop-blur-md">
          <LogoIcon svgKey="mobile-logo" />

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
            <Button
              variant="ghost"
              className="p-[4px]"
              onClick={() => setOpenMenu((prev) => !prev)}
            >
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
      </div>

      <div className="hidden xl:block">
        <header className="flex h-[60px] items-center bg-white/50 backdrop-blur-md">
          <div className="mx-auto flex w-full max-w-[1032px] items-center justify-between">
            <LogoIcon svgKey="desktop-logo" />

            <div className="flex items-center">
              <div className="flex gap-[40px] text-body2-medium text-gray-08">
                <Link href="#">서비스 소개</Link>
                <Link href="#">픽토스 소식</Link>
                <Link href="#">구독 및 결제</Link>
              </div>

              <LoginDialog
                trigger={
                  <Button
                    variant="gradation"
                    className="ml-[59px] h-[42px] w-[120px] !rounded-[32px] !text-button text-white"
                  >
                    로그인
                  </Button>
                }
              />
            </div>
          </div>
        </header>
      </div>
    </div>
  )
}
