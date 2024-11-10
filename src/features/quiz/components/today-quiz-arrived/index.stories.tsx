import { Meta, StoryObj } from '@storybook/react'
import TodayQuizArrived from '.'

const meta = {
  title: 'main/TodayQuizArrived',
  component: TodayQuizArrived,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-mobile p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TodayQuizArrived>

export default meta

type Story = StoryObj<typeof TodayQuizArrived>

// 기본 스토리: 기본 UI 상태
export const Default: Story = {}
