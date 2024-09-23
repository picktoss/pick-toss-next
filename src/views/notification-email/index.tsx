'use client'

import { useVerifyEmailCheckMutation } from '@/actions/fetchers/auth/verify-email-check/mutation'
import { useVerifyEmailMutation } from '@/actions/fetchers/auth/verify-email/mutation'
import { Button } from '@/shared/components/ui/button'
import { useToast } from '@/shared/hooks/use-toast'
import { useUser } from '@/shared/hooks/use-user'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useRef, useState } from 'react'

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const codeRegex = /^[0-9]{6}$/

const EmailSettingForm = () => {
  const router = useRouter()
  const { user } = useUser()
  const { toast } = useToast()

  const [emailInput, setEmailInput] = useState(user?.email || '')
  const [codeInput, setCodeInput] = useState('')
  const isFirstEmail = useRef(user?.email || '')

  const {
    mutate: verifyEmailMutate,
    isPending: isSendingEmail,
    isSuccess: isSentEmail,
  } = useVerifyEmailMutation()

  const {
    mutate: verifyEmailCheckMutate,
    isPending: isVerifyingCode,
    isError: isVerifyError,
  } = useVerifyEmailCheckMutation()

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value

    setEmailInput(input)
  }

  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value

    if (input.length > 6) return

    if (isNaN(Number(input))) return

    setCodeInput(input)
  }

  const handleRequestCodeClick = () => {
    verifyEmailMutate({
      email: emailInput,
    })
  }

  const handleVerifyCodeClick = () => {
    verifyEmailCheckMutate(
      {
        email: emailInput,
        verificationCode: codeInput,
      },
      {
        onSuccess: () => {
          const description = isFirstEmail.current
            ? '알림 받을 이메일이 등록되었습니다'
            : '알림 받을 이메일이 변경되었습니다'
          toast({ description: description })
          router.push('/profile/notification')
        },
      }
    )
  }

  const getEmailMessage = () => {
    if (!isValidateEmail)
      return `올바른 도메인 주소와 @를 포함한 형식으로 입력해주세요\n(예: pictoss@gmail.com)`

    if (isSendingEmail) return `인증 이메일을 전송하고 있습니다`

    if (isSentEmail) return `작성하신 이메일로 인증 코드가 전송되었습니다`

    return ''
  }

  const getCodeMessage = () => {
    if (isVerifyingCode) return `인증 진행 중`

    if (isVerifyError) return `인증에 실패했습니다. 코드를 다시 확인해주세요.`

    return ``
  }

  const isValidateEmail = emailInput?.match(emailRegex)
  const isValidateCode = codeInput.match(codeRegex)

  return (
    <div>
      <div className="mb-[32px]">
        <label className="mb-[8px] text-small1-regular text-gray-07">알림 받을 이메일</label>
        <div className="mb-[4px] flex h-[48px] w-full items-center rounded-sm border border-gray-01 bg-gray-01 px-[10px] focus-within:border-blue-05">
          <input
            className="flex-1 bg-gray-01 outline-none disabled:text-gray-06"
            placeholder="이메일 주소 입력"
            value={emailInput}
            onChange={handleEmailChange}
            disabled={isSentEmail}
          />
          <button
            className="h-[24px] rounded-[4px] bg-orange-02 px-[7px] text-tag text-orange-06 hover:bg-orange-02/80 disabled:bg-gray-02 disabled:text-gray-04"
            disabled={!isValidateEmail}
            onClick={handleRequestCodeClick}
          >
            {isSentEmail ? '코드 재전송' : '인증 코드 전송'}
          </button>
        </div>
        <p className="whitespace-pre-wrap text-small1-regular leading-[18px] text-blue-05">
          {getEmailMessage()}
        </p>
      </div>
      {isSentEmail && (
        <div>
          <label className="mb-[8px] text-small1-regular text-gray-07">인증 코드</label>
          <div className="flex items-center gap-[24px]">
            <input
              className="h-[48px] w-[180px] rounded-sm border border-gray-01 bg-gray-01 px-[10px] outline-none focus:border-blue-05"
              placeholder="6자리 숫자 입력"
              value={codeInput}
              onChange={handleCodeChange}
            />
            <Button size="lg" disabled={!isValidateCode} onClick={handleVerifyCodeClick}>
              완료
            </Button>
          </div>
          <p className="whitespace-pre-wrap text-small1-regular leading-[18px] text-blue-05">
            {getCodeMessage()}
          </p>
        </div>
      )}
    </div>
  )
}

export default EmailSettingForm
