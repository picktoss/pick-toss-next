import { signOut } from '@/app/api/auth/[...nextauth]/auth'
import { Button } from '@/shared/components/ui/button'
import icons from '@/constants/icons'
import Image from 'next/image'

export default function SignOut() {
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <Button
        variant="ghost"
        className="w-full items-start justify-start gap-[8px] rounded-[12px] bg-white px-[20px] pb-[15px] pt-[17px] !text-body1-medium text-gray-08"
      >
        <div>로그아웃</div>
        <Image src={icons.logOut} width={16} height={16} alt="" />
      </Button>
    </form>
  )
}
