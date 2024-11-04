'use client'

import { Button } from '@/shared/components/ui/button'
import VerifyCodeInput from '../code-input'
import VerifyEmailInput from '../email-input'
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

      <VerifyEmailInput
        isAllowed={isAllowed}
        setIsAllowed={setIsAllowed}
        // prevEmail="picktoss@example.com" // 기존 등록된 이메일이 있을 경우
      />

      {isAllowed && (
        <Button variant={'largeRound'} className="mt-[48px] w-full" disabled={!activeSaveButton}>
          저장하기
        </Button>
      )}
    </>
  )
}

export default EmailVerification
