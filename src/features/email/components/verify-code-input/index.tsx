'use client'

import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import React, { useEffect, useRef } from 'react'
import { useEmailVerification } from '../../context/email-verification-context'

const VerifyCodeInput = () => {
  const codeInputRef = useRef<HTMLInputElement>(null)
  const { setActiveSaveButton } = useEmailVerification()

  useEffect(() => {
    codeInputRef.current?.focus()
  }, [])

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 6) setActiveSaveButton(true)
  }

  return (
    <Input
      ref={codeInputRef}
      essential
      label="인증번호"
      placeholder="숫자 6자리 입력"
      className="mt-[30px]"
      right={
        <Button variant={'tinySquare'} colors={'outlined'}>
          재전송
        </Button>
      }
      // hasError일 경우, bottomText={'인증번호가 올바르지 않습니다.'}
      onChange={handleCodeChange}
    />
  )
}

export default VerifyCodeInput
