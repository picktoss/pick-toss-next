import { Meta, StoryObj } from '@storybook/react'
import InquiryType from '.'
import { useEffect } from 'react'
import { InquiryProvider, Type, useInquiry } from '../../../contexts/inquiry-context'

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
      options: [
        'ERROR',
        'PAYMENT',
        'PARTNERSHIP',
        'EVENT',
        'ACCOUNT_INFO',
        'CANCELLATION',
        'OTHER',
      ],
      description: '현재 선택된 문의 유형',
    },
  },
} satisfies Meta<typeof InquiryType>

export default meta
type Story = StoryObj<typeof InquiryTypeWithArgs>

export const Default: Story = {
  args: {
    type: 'ERROR',
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
