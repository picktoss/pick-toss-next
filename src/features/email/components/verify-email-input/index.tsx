'use client'

import { validateEmail } from '@/shared/utils/email'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import Text from '@/shared/components/ui/text'
import { useEffect, useState } from 'react'
import { DOMAIN_SUGGESTIONS } from '../../constants/domain'
import Icon from '@/shared/components/custom/icon'

interface Props {
  isAllowed: null | boolean
  setIsAllowed: (value: boolean) => void
}

const VerifyEmailInput = ({ isAllowed, setIsAllowed }: Props) => {
  const [isValid, setIsValid] = useState(false)
  const [email, setEmail] = useState('')
  const [isEmailFocused, setIsEmailFocused] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])

  // 유저 정보에서 등록된 이메일이 있다면 input value로 설정
  // useEffect(() => {
  //   setEmail('picktos@gmail.com')
  // }, [])

  useEffect(() => {
    setIsValid(validateEmail(email))
  }, [email])

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    setIsValid(validateEmail(value))

    // 자동완성 로직
    const atIndex = value.indexOf('@')

    if (atIndex === -1) {
      // `@`가 입력되지 않은 경우, 기본 도메인을 추천
      setSuggestions(DOMAIN_SUGGESTIONS.map((domain) => `${value}@${domain}`))
    } else {
      // `@`가 입력된 경우, 입력된 부분을 기준으로 도메인 필터링
      const enteredDomain = value.slice(atIndex + 1).toLowerCase()
      setSuggestions(
        DOMAIN_SUGGESTIONS.filter((domain) => domain.startsWith(enteredDomain)).map(
          (domain) => `${value.slice(0, atIndex + 1)}${domain}`
        )
      )
    }
  }

  // todo: 이메일 확인 버튼 눌렀을 때 실행될 로직 구현
  const handleClickConfirm = () => {
    setIsAllowed(true)
  }

  const renderRightComponent = (isAllowed: null | boolean) => {
    if (isAllowed) {
      return <Icon name="check" className="size-[16px] text-icon-tertiary" />
    } else {
      return (
        <Button
          variant={'tinySquare'}
          colors={'outlined'}
          disabled={!isValid}
          onClick={handleClickConfirm}
        >
          확인
        </Button>
      )
    }
  }

  const renderBottomText = (): undefined | string | { text: string; type: 'info' } => {
    if (isAllowed === false) {
      // Input에 hasError를 넘기고 사유에 따라
      // return '이미 사용 중인 이메일입니다.'
      // return "@를 포함한 올바른 이메일 주소 형식으로 입력해주세요."
    }
    if (isEmailFocused && !isValid) {
      return { text: '@를 포함한 올바른 이메일 주소 형식으로 입력해주세요.', type: 'info' }
    }
    return undefined
  }

  return (
    <>
      <Input
        essential
        type="email"
        label="이메일"
        placeholder="이메일 주소를 입력해주세요"
        className="mt-[36px]"
        right={renderRightComponent(isAllowed)}
        value={email}
        onChange={handleEmailChange}
        onFocus={() => setIsEmailFocused(true)}
        bottomText={renderBottomText()}
      />

      {/* 이메일 자동완성 노출 박스 */}
      {email.length > 0 && !isValid && (
        <div className="mt-[11px] flex flex-col rounded-[12px] bg-background-base-02 px-[16px] py-[10px]">
          {suggestions.map((suggestion) => (
            <Text
              key={suggestion}
              as="button"
              typography="text1-regular"
              className="w-full py-[8px] text-left"
              onClick={() => setEmail(suggestion)}
            >
              {suggestion}
            </Text>
          ))}
        </div>
      )}
    </>
  )
}

export default VerifyEmailInput
