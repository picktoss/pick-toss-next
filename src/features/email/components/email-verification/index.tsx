'use client'

import { Button } from '@/shared/components/ui/button'
import { useEmailVerification } from '../../context/email-verification-context'
import VerifyCodeInput from '../verify-code-input'
import VerifyEmailInput from '../verify-email-input'

const EmailVerification = () => {
  const { isAllowed, activeSaveButton } = useEmailVerification()

  return (
    <>
      {isAllowed && <VerifyCodeInput />}

      <VerifyEmailInput />

      {isAllowed && (
        <Button variant={'largeRound'} className="mt-[48px] w-full" disabled={!activeSaveButton}>
          저장하기
        </Button>
      )}
    </>
  )
}

export default EmailVerification
