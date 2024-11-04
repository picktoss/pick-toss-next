import { Meta, StoryObj } from '@storybook/react'
import InquiryPage from './page'

const meta: Meta<typeof InquiryPage> = {
  title: 'Page/Inquiry',
  component: InquiryPage,
  parameters: {
    nextjs: { appDirectory: true },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-mobile">
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof InquiryPage>

export const Default: Story = {
  render: () => <InquiryPage />,
}
