/* eslint-disable @typescript-eslint/no-unused-vars */
import AvailableInviteView from '@/features/invite/screens/available-invite'
import UnavailableInviteView from '@/features/invite/screens/unavailable-invite'

interface Props {
  params: {
    code: string
  }
}

const InvitePage = ({ params }: Props) => {
  const code = params.code
  // 링크 유효기간 체크
  // 유효성에 따라 다른 page view 보여주기
  const isValid = false

  return (
    <main className="flex h-[calc(100dvh-54px)] w-full flex-col items-center overflow-y-auto overflow-x-hidden bg-background-base-02 px-[43px] scrollbar-hide">
      {isValid ? <AvailableInviteView code={code} /> : <UnavailableInviteView />}
    </main>
  )
}

export default InvitePage
