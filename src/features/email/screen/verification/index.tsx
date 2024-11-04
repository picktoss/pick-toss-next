'use client'

import { useState } from 'react'
import EmailVerification from '../../components/verification/email-verification'
import VerifyStateHeader from '../../components/verification/state-header'

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
