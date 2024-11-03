import { Meta, StoryObj } from '@storybook/react'
import EmailVerification from '.'

const meta: Meta<typeof EmailVerification> = {
  title: 'email/EmailVerification',
  component: EmailVerification,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-mobile p-4">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    isAllowed: {
      control: 'boolean',
      description: '이메일 인증번호 입력란 표시 여부',
    },
  },
} satisfies Meta<typeof EmailVerification>

export default meta

type Story = StoryObj<typeof EmailVerification>

// 기본 상태
export const Default: Story = {
  args: {
    isAllowed: false,
  },
}

// 인증이 허용된 상태: 인증번호 입력창과 버튼 노출
export const EmailAllowed: Story = {
  args: {
    isAllowed: true,
  },
}
