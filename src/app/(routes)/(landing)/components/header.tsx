'use client'

import { Button } from '@/components/ui/button'
import { LogoIcon, MenuIcon } from '../svgs'
import { signIn } from 'next-auth/react'

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-[60px] items-center justify-between border-b border-gray-02 bg-white/50 px-[16px] backdrop-blur-md">
      <LogoIcon />
      <div className="flex items-center gap-[19px]">
        <Button
          variant="gradation"
          className="h-[27px] w-[71px] !rounded-[16px] !text-small1-bold text-white"
          onClick={() => signIn()}
        >
          로그인
        </Button>
        <Button variant="ghost" className="p-[4px]">
          <MenuIcon />
        </Button>
      </div>
    </header>
  )
}
