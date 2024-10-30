import { Meta, StoryFn, StoryObj } from '@storybook/react'
import Notification from '.'

const meta: Meta<typeof Notification> = {
  title: 'Page/Notification',
  component: Notification,
  parameters: {
    nextjs: { appDirectory: true },
  },
  decorators: [
    (Story: StoryFn) => (
      <div className="mx-auto max-w-mobile">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Notification>

export default meta

export const Default: StoryObj<typeof Notification> = {}
