import { Button } from '@/shared/components/ui/button'
import Image from 'next/image'
import icons from '@/constants/icons'
import { signIn } from '@/app/api/auth/[...nextauth]/auth'

export default function SignIn() {
  return (
    <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2">
      <div className="flex w-40 flex-col gap-4">
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
            await signIn('google')
          }}
        >
          <Button type="submit" className="w-full bg-gray-200 text-[#3C1E1E] hover:bg-[#FBE44D]/80">
            <Image src={icons.google} alt="" width={20} height={20} className="mr-[12px]" />
            구글 로그인
          </Button>
        </form>
      </div>
    </div>
  )
}
