import { Meta, StoryObj } from '@storybook/react'
import { useEffect } from 'react'
import {
  EmailVerificationProvider,
  useEmailVerification,
} from '../../context/email-verification-context'
import VerifyStateHeader from '.'

const meta: Meta<typeof VerifyStateHeader> = {
  title: 'email/VerifyStateHeader',
  component: VerifyStateHeader,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-mobile">
        <EmailVerificationProvider>
          <Story />
        </EmailVerificationProvider>
      </div>
    ),
  ],
  argTypes: {
    isAllowed: {
      control: 'boolean',
      description: '이메일 인증 허용 여부',
    },
  },
} satisfies Meta<typeof VerifyStateHeader>

export default meta
type Story = StoryObj<typeof VerifyStateHeaderWithArgs>

export const Allowed: Story = {
  args: {
    isAllowed: true,
  },
  render: (args: { isAllowed: boolean }) => <VerifyStateHeaderWithArgs {...args} />,
}

export const NotAllowed: Story = {
  args: {
    isAllowed: false,
  },
  render: (args: { isAllowed: boolean }) => <VerifyStateHeaderWithArgs {...args} />,
}

const VerifyStateHeaderWithArgs = ({ isAllowed }: { isAllowed: boolean }) => {
  const { setIsAllowed } = useEmailVerification()

  useEffect(() => {
    setIsAllowed(isAllowed)
  }, [isAllowed, setIsAllowed])

  return <VerifyStateHeader />
}
