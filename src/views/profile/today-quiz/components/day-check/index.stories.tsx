import type { Meta, StoryObj } from '@storybook/react'
import DayCheck from '.'

const meta: Meta<typeof DayCheck> = {
  title: 'today-quiz/DayCheck',
  component: DayCheck,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checkData: { control: 'object', description: '오늘의 퀴즈 5일 연속 출석 정보를 담은 데이터' },
  },
} satisfies Meta<typeof DayCheck>

export default meta
type Story = StoryObj<typeof meta>

const sampleCheckData = [
  { day: 1, isComplete: true },
  { day: 2, isComplete: true },
  { day: 3, isComplete: false },
  { day: 4, isComplete: false },
  { day: 5, isComplete: false },
]

export const Default: Story = {
  args: {
    checkData: sampleCheckData,
  },
}

export const AllCompleted: Story = {
  args: {
    checkData: [
      { day: 1, isComplete: true },
      { day: 2, isComplete: true },
      { day: 3, isComplete: true },
      { day: 4, isComplete: true },
      { day: 5, isComplete: true },
    ],
  },
}

export const NoneCompleted: Story = {
  args: {
    checkData: [
      { day: 1, isComplete: false },
      { day: 2, isComplete: false },
      { day: 3, isComplete: false },
      { day: 4, isComplete: false },
      { day: 5, isComplete: false },
    ],
  },
}
