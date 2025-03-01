'use client'

import Icon from '@/shared/components/custom/icon'
import { Button } from '@/shared/components/ui/button'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import { signIn } from 'next-auth/react'

interface Props {
  className?: HTMLElement['className']
  inviteCode?: string
}

const SocialLogin = ({ className, inviteCode }: Props) => {
  // 소셜 로그인 처리 함수
  const handleSocialLogin = async (provider: 'google' | 'kakao') => {
    const options = inviteCode
      ? { callbackUrl: `/main?invite-code=${inviteCode}` }
      : { callbackUrl: '/' }

    await signIn(provider, options)
  }

  return (
    <div className={cn('flex w-full flex-col items-center', className)}>
      <Button
        className="w-full gap-[12px] rounded-full border border-[var(--color-gray-100)] bg-white py-[13.5px] hover:bg-white"
        onClick={async () => await handleSocialLogin('google')}
      >
        <Icon name="google" />
        <Text typography="text1-bold" color="primary">
          Google로 로그인
        </Text>
      </Button>
      <Button
        className="mt-[14px] w-full gap-[16px] rounded-full bg-[#FBE44D] py-[13.5px] text-[#3C1E1E] hover:bg-[#FBE44D]/80"
        onClick={async () => await handleSocialLogin('kakao')}
      >
        <Icon name="kakao" />
        <Text typography="text1-bold">카카오로 로그인</Text>
      </Button>
    </div>
  )
}

export default SocialLogin
