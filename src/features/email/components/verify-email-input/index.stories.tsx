import { Meta, StoryObj } from '@storybook/react'
import VerifyEmailInput from '.'
import { userEvent, within } from '@storybook/test'

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
    return <VerifyEmailInput {...args} />
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    // 이메일 입력
    const emailInput = canvas.getByPlaceholderText('이메일 주소를 입력해주세요')
    await userEvent.type(emailInput, 'test@example.com')

    // 확인 버튼 클릭
    const confirmButton = canvas.getByRole('button', { name: '확인' })
    await userEvent.click(confirmButton)
    args.setIsAllowed(true)
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
