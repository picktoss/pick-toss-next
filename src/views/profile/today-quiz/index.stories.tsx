import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import TodayQuiz from '.'

const meta = {
  title: 'Page/TodayQuiz',
  component: TodayQuiz,
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
} satisfies Meta<typeof TodayQuiz>

export default meta
type Story = StoryObj<typeof TodayQuiz>

export const Default: Story = {}