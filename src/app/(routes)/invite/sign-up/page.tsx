/* eslint-disable @typescript-eslint/no-unused-vars */
import SocialLogin from '@/features/auth/social-login'
import Text from '@/shared/components/ui/text'

interface Props {
  searchParams?: {
    code: string
  }
}

const InviteSignUpPage = ({ searchParams }: Props) => {
  // 유효한 코드일 경우 전달됨

  return (
    <main className="flex-center h-[calc(100dvh-54px)] w-full flex-col overflow-y-auto overflow-x-hidden bg-background-base-02 px-[16px] scrollbar-hide">
      <Text as={'h2'} typography="title1">
        3초만에 픽토스 시작하기
      </Text>

      <SocialLogin />
    </main>
  )
}

export default InviteSignUpPage
