'use client'

import EmailVerification from '@/features/email/components/email-verification'
import VerifyStateHeader from '@/features/email/components/verify-state-header'
import { useState } from 'react'

const EmailPage = () => {
  const [isAllowed, setIsAllowed] = useState<null | boolean>(null)

  return (
    <>
      <VerifyStateHeader isAllowed={isAllowed} />

      <EmailVerification isAllowed={isAllowed} setIsAllowed={setIsAllowed} />
    </>
  )
}

export default EmailPage
