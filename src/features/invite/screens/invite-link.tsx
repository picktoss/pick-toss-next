'use client'

import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import AvailableInviteView from './available-invite'
import UnavailableInviteView from './unavailable-invite'
import Loading from '@/shared/components/custom/loading'

const InviteLink = () => {
  const { code } = useParams()
  const requestBody = useMemo(() => {
    let inviteCode = ''

    if (code) {
      if (Array.isArray(code)) {
        inviteCode = code[0] || ''
      } else {
        inviteCode = code
      }
    }

    return { inviteCode }
  }, [code])

  const { data: isValid, isPending } = useQuery(queries.auth.verifyInvite(requestBody))

  return (
    <main className="flex h-[calc(100dvh-54px)] w-full flex-col items-center overflow-y-auto overflow-x-hidden bg-background-base-02 px-[43px] scrollbar-hide">
      {isPending && <Loading center />}
      {isValid !== undefined &&
        (isValid ? (
          <AvailableInviteView code={requestBody.inviteCode} />
        ) : (
          <UnavailableInviteView />
        ))}
    </main>
  )
}

export default InviteLink
