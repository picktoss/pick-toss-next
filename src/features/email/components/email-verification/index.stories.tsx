import { Meta, StoryObj } from '@storybook/react'
import { useEffect } from 'react'
import {
  EmailVerificationProvider,
  useEmailVerification,
} from '../../context/email-verification-context'
import EmailVerification from '.'

const meta: Meta<typeof EmailVerification> = {
  title: 'email/EmailVerification',
  component: EmailVerification,
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
      description: '이메일 인증번호 입력란 표시 여부',
    },
    activeSaveButton: {
      control: 'boolean',
      description: '저장하기 버튼 활성화 여부',
    },
  },
} satisfies Meta<typeof EmailVerification>

export default meta
type Story = StoryObj<typeof EmailVerificationWithArgs>

export const Default: Story = {
  args: {
    isAllowed: false,
    activeSaveButton: false,
  },
  render: (args) => <EmailVerificationWithArgs {...args} />,
}

export const EmailAllowed: Story = {
  args: {
    isAllowed: true,
    activeSaveButton: false,
  },
  render: (args) => <EmailVerificationWithArgs {...args} />,
}

export const SaveButtonActive: Story = {
  args: {
    isAllowed: true,
    activeSaveButton: true,
  },
  render: (args) => <EmailVerificationWithArgs {...args} />,
}

const EmailVerificationWithArgs = ({
  isAllowed,
  activeSaveButton,
}: {
  isAllowed: boolean
  activeSaveButton: boolean
}) => {
  const { setIsAllowed, setActiveSaveButton } = useEmailVerification()

  useEffect(() => {
    setIsAllowed(isAllowed)
    setActiveSaveButton(activeSaveButton)
  }, [isAllowed, activeSaveButton, setIsAllowed, setActiveSaveButton])

  return <EmailVerification />
}
