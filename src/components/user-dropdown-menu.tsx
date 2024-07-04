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
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import FeedbackDialog from './feedback-dialog'
import Link from 'next/link'

export function UserDropdownMenu() {
  const session = useSession()
  const router = useRouter()

  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false)

  const user = session.data?.user.dto

  if (!user) {
    return null
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <span className="flex items-center gap-[13px] rounded-xl px-[12px] py-[10px] hover:bg-gray-02 ">
            <span className="text-sm text-[#818181]">{user.name}님</span>
            <Image src={icons.chevronDown} alt="arrow-down" width={16} height={16} />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <div className="flex items-center gap-[16px] rounded-lg bg-blue-01 p-3">
              <div className="mb-1 text-body2-regular text-gray-08">
                <span className="pl-[12px] font-bold">{user.name}</span>님
              </div>
              <div className="text-body2-regular-eng text-gray-07">{user.email}</div>
            </div>
          </DropdownMenuLabel>
          <div className="px-2 py-1 text-body1-bold text-gray-07 *:cursor-pointer">
            <DropdownMenuItem onClick={() => router.push('/profile')}>
              <span className="text-base">설정</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setFeedbackDialogOpen(true)}>
              <div className="flex w-full justify-between text-base">
                <div>문의하기</div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/policy"
                target="_blank"
                className="flex w-full justify-between text-base"
              >
                <div>정책 및 이용약관</div>
                <Image src={icons.link} alt="move" width={16} height={16} />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              <span className="text-base text-notice-red">로그아웃</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <FeedbackDialog open={feedbackDialogOpen} onOpenChange={setFeedbackDialogOpen} />
    </>
  )
}
