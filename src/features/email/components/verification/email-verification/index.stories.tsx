import { Meta, StoryObj } from '@storybook/react'
import EmailVerification from '.'
import { useEffect, useState } from 'react'
import { userEvent, within } from '@storybook/test'

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
  render: (args) => {
    const [isAllowed, setIsAllowed] = useState<null | boolean>(null)

    useEffect(() => {
      setIsAllowed(args.isAllowed)
    }, [args.isAllowed])

    return <EmailVerification isAllowed={isAllowed} setIsAllowed={setIsAllowed} />
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const emailInput = canvas.getByPlaceholderText('이메일 주소를 입력해주세요')
    await userEvent.type(emailInput, 'example-email@email.com', {
      delay: 70,
    })

    const confirmButton = canvas.getByRole('button', { name: '확인' })
    await userEvent.click(confirmButton)
  },
}

// 인증이 허용된 상태: 인증번호 입력창과 버튼 노출
export const EmailAllowed: Story = {
  args: {
    isAllowed: true,
  },
  render: (args) => {
    return <EmailVerification {...args} />
  },
}
