import { Meta, StoryObj } from '@storybook/react'
import SetEmail from '.'
import { InquiryProvider, useInquiry } from '../../context/inquiry-context'
import { useEffect } from 'react'

const meta: Meta<typeof SetEmail> = {
  title: 'inquiry/SetEmail',
  component: SetEmail,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-mobile">
        <InquiryProvider>
          <Story />
        </InquiryProvider>
      </div>
    ),
  ],
  argTypes: {
    email: {
      control: 'text',
      description: '이메일 주소',
      defaultValue: '',
    },
  },
}

export default meta

type Story = StoryObj<typeof SetEmailWithArgs>

export const Default: Story = {
  args: {
    email: '',
  },
  render: (args) => <SetEmailWithArgs {...args} />,
}

const SetEmailWithArgs = ({ email }: { email: string }) => {
  const { setEmail } = useInquiry()

  useEffect(() => {
    setEmail(email)
  }, [email, setEmail])

  return <SetEmail />
}
