'use client'

import { Button } from '@/shared/components/ui/button'
import VerifyCodeInput from '../verify-code-input'
import VerifyEmailInput from '../verify-email-input'
import { useState } from 'react'

interface Props {
  isAllowed: null | boolean
  setIsAllowed: (value: boolean) => void
}

const EmailVerification = ({ isAllowed, setIsAllowed }: Props) => {
  const [activeSaveButton, setActiveSaveButton] = useState(false)

  return (
    <>
      {isAllowed && <VerifyCodeInput setActiveSaveButton={setActiveSaveButton} />}

      <VerifyEmailInput isAllowed={isAllowed} setIsAllowed={setIsAllowed} />

      {isAllowed && (
        <Button variant={'largeRound'} className="mt-[48px] w-full" disabled={!activeSaveButton}>
          저장하기
        </Button>
      )}
    </>
  )
}

export default EmailVerification
