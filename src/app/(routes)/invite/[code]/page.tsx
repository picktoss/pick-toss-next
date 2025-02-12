/* eslint-disable @typescript-eslint/no-unused-vars */
import AvailableInviteView from '@/features/invite/screens/available-invite'
import UnavailableInviteView from '@/features/invite/screens/unavailable-invite'
import { verifyInviteCode } from '@/requests/auth/server'

interface Props {
  params: {
    code: string
  }
}

const InvitePage = async ({ params }: Props) => {
  const code = params.code
  const isValid = await verifyInviteCode({ inviteCode: code })

  return (
    <main className="flex h-[calc(100dvh-54px)] w-full flex-col items-center overflow-y-auto overflow-x-hidden bg-background-base-02 px-[43px] scrollbar-hide">
      {isValid ? <AvailableInviteView code={code} /> : <UnavailableInviteView />}
    </main>
  )
}

export default InvitePage
