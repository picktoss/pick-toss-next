import { Meta, StoryObj } from '@storybook/react'
import { EmailVerificationProvider } from '../../context/email-verification-context'
import VerifyCodeInput from '.'

const meta: Meta<typeof VerifyCodeInput> = {
  title: 'email/VerifyCodeInput',
  component: VerifyCodeInput,
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
} satisfies Meta<typeof VerifyCodeInput>

export default meta
type Story = StoryObj<typeof VerifyCodeInput>

export const Default: Story = {}
