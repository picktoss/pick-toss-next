'use client'

import { Button } from '@/shared/components/ui/button'
import { LogoIcon, MenuIcon } from '../svgs'
import { useEffect, useState } from 'react'
import { LoginDialog } from './login-dialog'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { checkPWAAppLaunched } from '@/shared/utils/pwa'

export function Header() {
  const router = useRouter()
  const [openMenu, setOpenMenu] = useState(false)
  const isLaunched = checkPWAAppLaunched()

  useEffect(() => {
    if (isLaunched) {
      router.replace('/app-start')
    }
  }, [isLaunched])

  return (
    <div className="sticky top-0 z-50">
      <div className="xl:hidden">
        <header className="border-gray-02 bg-white/50 flex h-[60px] items-center justify-between border-b px-[16px] backdrop-blur-md">
          <LogoIcon svgKey="mobile-logo" />

          <div className="flex items-center gap-[19px]">
            <LoginDialog
              trigger={
                <Button className="!text-small1-bold h-[27px] w-[71px] !rounded-[16px] text-white">
                  로그인
                </Button>
              }
            />
            <Button className="p-[4px]" onClick={() => setOpenMenu((prev) => !prev)}>
              <MenuIcon />
            </Button>
          </div>
        </header>
        {openMenu && (
          <div className="bg-white/50 text-body2-medium text-gray-08 fixed top-[60px] z-50 w-full max-w-screen-md pb-[23px] pt-[14px] backdrop-blur-md">
            <div role="button" className="w-fit px-[20px] py-[12px]">
              서비스 소개
            </div>
            <div role="button" className="w-fit px-[20px] py-[12px]">
              픽토스 소식
            </div>
          </div>
        )}
      </div>

      <div className="hidden xl:block">
        <header className="bg-white/50 flex h-[60px] items-center backdrop-blur-md">
          <div className="mx-auto flex w-full max-w-[1032px] items-center justify-between">
            <LogoIcon svgKey="desktop-logo" />

            <div className="flex items-center">
              <div className="text-body2-medium text-gray-08 flex gap-[40px]">
                <Link href="#">서비스 소개</Link>
                <Link href="#">픽토스 소식</Link>
              </div>

              <LoginDialog
                trigger={
                  <Button className="!text-button ml-[59px] h-[42px] w-[120px] !rounded-[32px] text-white">
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
