import { Meta, StoryObj } from '@storybook/react'
import Inquiry from '.'

const meta: Meta<typeof Inquiry> = {
  title: 'Page/Inquiry',
  component: Inquiry,
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

type Story = StoryObj<typeof Inquiry>

export const Default: Story = {
  render: () => <Inquiry />,
}
