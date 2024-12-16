import type { Meta, StoryObj } from '@storybook/react'
import SelectableQuizCard from '.'
import { quizzes } from '@/features/quiz/config'

const meta = {
  title: 'Collection/SelectableQuizCard',
  component: SelectableQuizCard,
  parameters: {
    nextjs: { appDirectory: true },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-mobile">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SelectableQuizCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSelect: () => {},
    selected: false,
    order: 0,
    quiz: quizzes[0]!,
  },
}

export const Selected: Story = {
  args: {
    onSelect: () => {},
    selected: true,
    order: 1,
    quiz: quizzes[1]!,
  },
}
