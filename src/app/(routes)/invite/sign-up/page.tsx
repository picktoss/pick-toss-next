/* eslint-disable @typescript-eslint/no-unused-vars */
import SocialLogin from '@/features/auth/social-login'
import UnavailableInviteView from '@/features/invite/screens/unavailable-invite'
import ClearBrowserData from '@/features/user/components/clear-browser-data'
import { verifyInviteCode } from '@/requests/auth/server'
import Text from '@/shared/components/ui/text'

interface Props {
  searchParams?: {
    code: string
  }
}

const InviteSignUpPage = async ({ searchParams }: Props) => {
  const code = searchParams?.code ?? ''
  const isValid = await verifyInviteCode({ inviteCode: code })
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

      <SocialLogin className="my-[64px]" inviteCode={searchParams?.code} />
      <ClearBrowserData />
    </main>
  )
}

export default InviteSignUpPage
