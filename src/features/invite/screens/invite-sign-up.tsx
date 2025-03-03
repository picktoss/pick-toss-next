'use client'

import { useDynamicThemeColor } from '@/shared/hooks/use-dynamic-theme-color'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import UnavailableInviteView from './unavailable-invite'
import Text from '@/shared/components/ui/text'
import SocialLogin from '@/features/auth/social-login'
import ClearBrowserData from '@/features/user/components/clear-browser-data'

const InviteSignUp = () => {
  useDynamicThemeColor('#F5F7F9', '#FFFFFF')

  const code = useSearchParams().get('code') ?? ''
  const { data: isValid } = useQuery(queries.auth.verifyInvite({ inviteCode: code }))
  // 유효한 코드일 경우 전달됨

  if (!isValid) {
    return (
      <main className="flex h-[calc(100dvh-54px)] w-full flex-col items-center overflow-y-auto overflow-x-hidden bg-background-base-02 px-[43px] scrollbar-hide">
        <UnavailableInviteView />
      </main>
    )
  }

  return (
    <main className="flex-center h-[calc(100dvh-54px)] w-full flex-col overflow-y-auto overflow-x-hidden bg-background-base-02 px-[16px] scrollbar-hide">
      <Text as={'h2'} typography="title1">
        3초만에 픽토스 시작하기
      </Text>

      <SocialLogin className="my-[64px]" inviteCode={code} />
      <ClearBrowserData />
    </main>
  )
}

export default InviteSignUp
