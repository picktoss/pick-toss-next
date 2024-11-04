/* eslint-disable @typescript-eslint/no-unused-vars */
import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import VerifyCodeInput from '.'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'

const meta: Meta<typeof VerifyCodeInput> = {
  title: 'email/VerifyCodeInput',
  component: VerifyCodeInput,
  tags: ['autodocs'],
  argTypes: {
    setActiveSaveButton: { action: 'setActiveSaveButton' },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-mobile p-4">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof VerifyCodeInput>

// 기본 상태 스토리
export const Default: Story = {
  render: (args) => {
    const [isActive, setIsActive] = useState(false)
    return <VerifyCodeInput {...args} setActiveSaveButton={setIsActive} />
  },
}

// 잘못된 인증번호 입력 상태의 스토리 (hasError 예시)
export const ErrorState: Story = {
  render: (args) => {
    const [isActive, setActiveSaveButton] = useState(false)

    const handleCodeChange = (e: React.FormEvent<HTMLInputElement>) => {
      const input = e.currentTarget
      const value = input.value

      if (!/^\d*$/.test(value)) {
        input.value = value.replace(/\D/g, '') // 숫자가 아닌 문자 제거
      }

      setActiveSaveButton(input.value.length === 6)
    }

    return (
      <Input
        essential
        label="인증번호"
        placeholder="숫자 6자리 입력"
        className="mt-[30px]"
        right={
          <Button variant={'tinySquare'} colors={'outlined'}>
            재전송
          </Button>
        }
        hasError
        bottomText={'인증번호가 올바르지 않습니다.'}
        onInput={handleCodeChange}
      />
    )
  },
}
