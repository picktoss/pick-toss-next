import { Meta, StoryObj } from '@storybook/react'
import { useEffect, useState } from 'react'
import VerifyEmailInput from '.'

const meta: Meta<typeof VerifyEmailInput> = {
  title: 'email/VerifyEmailInput',
  component: VerifyEmailInput,
  tags: ['autodocs'],
  argTypes: {
    isAllowed: {
      control: 'boolean',
      description: '이메일 사용 가능 여부',
    },
    setIsAllowed: { action: 'setIsAllowed' },
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
type Story = StoryObj<typeof VerifyEmailInput>

// 기본 상태 스토리
export const Default: Story = {
  render: (args) => {
    const [isAllowed, setIsAllowed] = useState<null | boolean>(null)

    useEffect(() => {
      setIsAllowed(args.isAllowed)
    }, [args.isAllowed])

    return <VerifyEmailInput isAllowed={isAllowed} setIsAllowed={setIsAllowed} />
  },
}

// 이메일이 사용 가능해 체크 아이콘이 표시된 상태
export const EmailConfirmed: Story = {
  args: {
    isAllowed: true,
  },
  render: (args) => {
    return <VerifyEmailInput {...args} />
  },
}
