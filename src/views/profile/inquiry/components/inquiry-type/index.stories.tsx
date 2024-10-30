import { Meta, StoryObj } from '@storybook/react'
import InquiryType from '.'
import { InquiryProvider, Type, useInquiry } from '../../context/inquiry-context'
import { useEffect } from 'react'

const meta: Meta<typeof InquiryType> = {
  title: 'inquiry/InquiryType',
  component: InquiryType,
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
    type: {
      control: 'select',
      options: ['error', 'payment', 'coalition', 'event', 'userInfo', 'cancel', 'etc'],
      description: '현재 선택된 문의 유형',
    },
  },
} satisfies Meta<typeof InquiryType>

export default meta
type Story = StoryObj<typeof InquiryTypeWithArgs>

export const Default: Story = {
  args: {
    type: 'error',
  },
  render: (args: { type: Type }) => <InquiryTypeWithArgs {...args} />,
}

const InquiryTypeWithArgs = ({ type }: { type: Type }) => {
  const { setType } = useInquiry()

  useEffect(() => {
    setType(type)
  }, [type, setType])

  return <InquiryType />
}
