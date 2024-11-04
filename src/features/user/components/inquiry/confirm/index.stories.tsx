import { Meta, StoryObj } from '@storybook/react'
import Confirm from '.'
import { useEffect } from 'react'
import { InquiryProvider, useInquiry } from '../../../contexts/inquiry-context'

const meta: Meta<typeof Confirm> = {
  title: 'inquiry/Confirm',
  component: Confirm,
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
    isAgreeChecked: {
      control: 'boolean',
      description: '개인정보 수집 및 이용동의 여부',
      defaultValue: false,
    },
  },
}

export default meta

type Story = StoryObj<typeof ConfirmWithArgs>

export const Default: Story = {
  args: {
    isAgreeChecked: false,
  },
  render: (args) => <ConfirmWithArgs {...args} />,
}

const ConfirmWithArgs = ({ isAgreeChecked }: { isAgreeChecked: boolean }) => {
  const { setIsAgreeChecked } = useInquiry()

  useEffect(() => {
    setIsAgreeChecked(isAgreeChecked)
  }, [isAgreeChecked, setIsAgreeChecked])

  return <Confirm />
}
