import type { Meta, StoryObj } from '@storybook/react'
import DayItem from './day-item'

const meta: Meta<typeof DayItem> = {
  title: 'today-quiz/DayItem',
  component: DayItem,
  tags: ['autodocs'],
  argTypes: {
    day: { control: 'number', description: '해당 날짜' },
    isComplete: { control: 'boolean', description: '퀴즈 완료 여부' },
    isLast: { control: 'boolean', description: '마지막 날 여부' },
  },
} satisfies Meta<typeof DayItem>

export default meta
type Story = StoryObj<typeof meta>

// 기본 (미완료 상태)
export const Default: Story = {
  args: {
    day: 1,
    isComplete: false,
  },
}
// 완료된 날
export const CompletedDay: Story = {
  args: {
    day: 2,
    isComplete: true,
  },
}
// 마지막 날
export const LastDay: Story = {
  args: {
    day: 5,
    isComplete: false,
    isLast: true,
  },
}
