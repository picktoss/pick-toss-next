'use client'

import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function SignIn() {
  return (
    <main className="flex justify-center">
      <div className="mt-16">
        <Button
          className="w-full bg-[#FBE44D] text-[#3C1E1E] hover:bg-[#FBE44D]/80"
          onClick={() => signIn('kakao')}
        >
          <Image src="/icons/kakao.svg" alt="" width={20} height={20} className="mr-[12px]" />
          카카오 로그인
        </Button>
      </div>
    </main>
  )
}
