'use client'

import { useState } from 'react'
import EmailVerification from '../../components/email-verification'
import VerifyStateHeader from '../../components/verify-state-header'

const Verification = () => {
  const [isAllowed, setIsAllowed] = useState<null | boolean>(null)

  return (
    <>
      <VerifyStateHeader isAllowed={isAllowed} />

      <EmailVerification isAllowed={isAllowed} setIsAllowed={setIsAllowed} />
    </>
  )
}

export default Verification
