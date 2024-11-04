import { Meta, StoryObj } from '@storybook/react'
import EmailPage from './page'

const meta: Meta<typeof EmailPage> = {
  title: 'Page/Email',
  component: EmailPage,
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

type Story = StoryObj<typeof EmailPage>

export const Default: Story = {
  render: () => <EmailPage />,
}
