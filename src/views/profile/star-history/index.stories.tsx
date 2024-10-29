import { Meta, StoryObj } from '@storybook/react'
import StarHistory from '.'

const meta: Meta<typeof StarHistory> = {
  title: 'Page/StarHistory',
  component: StarHistory,
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
} satisfies Meta<typeof StarHistory>

export default meta

export const Default: StoryObj<typeof StarHistory> = {}
