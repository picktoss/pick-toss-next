import { Meta, StoryObj } from '@storybook/react'
import VerifyStateHeader from '.'

const meta: Meta<typeof VerifyStateHeader> = {
  title: 'email/VerifyStateHeader',
  component: VerifyStateHeader,
  tags: ['autodocs'],
  argTypes: {
    isAllowed: {
      control: 'boolean',
      description: '이메일 인증 상태를 나타냅니다.',
    },
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
type Story = StoryObj<typeof VerifyStateHeader>

// 기본 상태: 이메일 인증이 허용되지 않은 상태
export const Default: Story = {
  args: {
    isAllowed: false,
  },
}

// 인증이 허용된 상태: 인증번호 입력 안내 메시지 표시
export const AllowedState: Story = {
  args: {
    isAllowed: true,
  },
}
