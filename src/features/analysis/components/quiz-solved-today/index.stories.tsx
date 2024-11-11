import { Meta, StoryObj } from '@storybook/react'
import QuizSolvedToday from '.'

const meta = {
  title: 'analysis/QuizSolvedToday',
  component: QuizSolvedToday,
  tags: ['autodocs'],
  argTypes: {
    quizCount: {
      control: 'number',
      description: '오늘 푼 퀴즈 수',
    },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-mobile p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof QuizSolvedToday>

export default meta

type Story = StoryObj<typeof QuizSolvedToday>

// 기본 스토리: 퀴즈 개수가 5개인 경우
export const Default: Story = {
  args: {
    quizCount: 15,
  },
}
