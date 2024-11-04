import { Meta, StoryObj } from '@storybook/react'
import InquiryPage from './page'
import Header from './@header/default'
import { InquiryProvider } from '@/features/user/contexts/inquiry-context'

const meta: Meta<typeof InquiryPage> = {
  title: 'Page/Inquiry',
  component: InquiryPage,
  parameters: {
    nextjs: { appDirectory: true },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-mobile">
        <InquiryProvider>
          <Story />
        </InquiryProvider>
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof InquiryPage>

export const Default: Story = {
  render: () => (
    <>
      <Header />
      <InquiryPage />
    </>
  ),
}
