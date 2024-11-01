import { Meta, StoryObj } from '@storybook/react'
import { useEffect } from 'react'
import {
  EmailVerificationProvider,
  useEmailVerification,
} from '../../context/email-verification-context'
import VerifyEmailInput from '.'

const meta: Meta<typeof VerifyEmailInput> = {
  title: 'email/VerifyEmailInput',
  component: VerifyEmailInput,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-mobile p-4">
        <EmailVerificationProvider>
          <Story />
        </EmailVerificationProvider>
      </div>
    ),
  ],
  argTypes: {
    isAllowed: {
      control: 'boolean',
      description: '서버에서 이메일 허용 여부',
    },
    isValid: {
      control: 'boolean',
      description: '이메일 형식 유효성 여부',
    },
  },
} satisfies Meta<typeof VerifyEmailInput>

export default meta
type Story = StoryObj<typeof VerifyEmailInputWithArgs>

export const Default: Story = {
  args: {
    isAllowed: true,
    isValid: true,
  },
  render: (args) => <VerifyEmailInputWithArgs {...args} />,
}

export const InvalidEmail: Story = {
  args: {
    isAllowed: true,
    isValid: false,
  },
  render: (args) => <VerifyEmailInputWithArgs {...args} />,
}

const VerifyEmailInputWithArgs = ({
  isAllowed,
  isValid,
}: {
  isAllowed: boolean
  isValid: boolean
}) => {
  const { setIsAllowed, setIsValid, setEmail } = useEmailVerification()

  useEffect(() => {
    setIsAllowed(isAllowed)
    setIsValid(isValid)
    setEmail('') // 초기 이메일 값 설정
  }, [isAllowed, isValid, setIsAllowed, setIsValid, setEmail])

  return <VerifyEmailInput />
}
