'use client'

import { useSession } from 'next-auth/react'

export function SuggestTip() {
  const { data: session } = useSession()
  const user = session?.user.dto
  if (!user || user.email) return

  return (
    <div className="absolute left-[78px] top-[-14px] whitespace-nowrap rounded-[14px] rounded-bl-none bg-blue-06 px-[24px] py-[10px] text-small1-regular text-white">
      퀴즈 알림을 받을 이메일을 등록해보세요
    </div>
  )
}
