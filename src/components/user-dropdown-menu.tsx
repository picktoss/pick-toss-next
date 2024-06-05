'use client'

import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import icons from '@/constants/icons'
import Image from 'next/image'
import { signOut } from '@/app/api/auth/[...nextauth]/auth'
import { useSession } from 'next-auth/react'

export function UserDropdownMenu() {
  const session = useSession()
  const router = useRouter()

  const user = session.data?.user.dto

  if (!user) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <span className="flex items-center gap-[13px] rounded-xl p-1 hover:bg-gray-02">
          <div className="size-8 rounded-full bg-orange-04" />
          <span className="text-sm text-[#818181]">{user.name}님</span>
          <Image src={icons.chevronDown} alt="arrow-down" width={16} height={16} />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="flex items-center gap-[16px] rounded-lg bg-blue-01 p-3">
            <div className="size-10 rounded-full bg-orange-04" />
            <div>
              <div className="mb-1 text-body2-regular text-gray-08">
                <span className="font-bold">{user.name}</span>님
              </div>
              <div className="text-body2-regular-eng text-gray-07">{user.email}</div>
            </div>
          </div>
        </DropdownMenuLabel>
        <div className="px-2 py-1 text-body1-bold text-gray-07 *:cursor-pointer">
          <DropdownMenuItem onClick={() => router.push('/profile')}>
            <span className="text-base">설정</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <div className="flex w-full justify-between text-base">
              <div>문의하기</div>
              <Image src={icons.link} alt="move" width={16} height={16} />
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex w-full justify-between text-base">
              <div>정책 및 이용약관</div>
              <Image src={icons.link} alt="move" width={16} height={16} />
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            <span className="text-base text-notice-red">로그아웃</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
