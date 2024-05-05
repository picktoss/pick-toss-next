import { Button } from '@/components/ui/button'
import Image from 'next/image'
import icons from '@/constants/icons'
import { signIn, signOut } from '@/app/api/auth/[...nextauth]/auth'

export default function SignIn() {
  return (
    <main className="flex justify-center">
      <div className="mt-16">
        <form
          action={async () => {
            'use server'
            await signIn('kakao')
          }}
        >
          <Button
            type="submit"
            className="w-full bg-[#FBE44D] text-[#3C1E1E] hover:bg-[#FBE44D]/80"
          >
            <Image src={icons.kakao} alt="" width={20} height={20} className="mr-[12px]" />
            카카오 로그인
          </Button>
        </form>
        <form
          action={async () => {
            'use server'
            await signOut()
          }}
        >
          <Button type="submit">로그아웃</Button>
        </form>
      </div>
    </main>
  )
}
