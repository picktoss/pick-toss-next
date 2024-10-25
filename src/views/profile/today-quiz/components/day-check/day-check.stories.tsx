import type { Meta, StoryObj } from '@storybook/react'
import DayCheck from './day-check'
import DayItem from '../day-item/day-item'

const meta: Meta<typeof DayCheck> = {
  title: 'today-quiz/DayCheck',
  component: DayCheck,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DayCheck>

export default meta
type Story = StoryObj<typeof meta>

// 기본 (체크 x)
export const Default: Story = {
  render: () => {
    const customCheckData = [
      { day: 1, isComplete: false },
      { day: 2, isComplete: false },
      { day: 3, isComplete: false },
      { day: 4, isComplete: false },
      { day: 5, isComplete: false },
    ]

    return (
      <div className="w-full max-w-[400px]">
        <div className="h-fit w-full bg-background-base-02 rounded-[20px] px-[40px] pt-[16px] pb-[23px] flex-center gap-[16px] mt-[32px]">
          {customCheckData.map(({ day, isComplete }) => (
            <DayItem key={day} day={day} isComplete={isComplete} isLast={day === 5} />
          ))}
        </div>
      </div>
    )
  },
}
// 전체 완료 상태
export const AllCompleted: Story = {
  render: () => {
    const customCheckData = [
      { day: 1, isComplete: true },
      { day: 2, isComplete: true },
      { day: 3, isComplete: true },
      { day: 4, isComplete: true },
      { day: 5, isComplete: true },
    ]

    return (
      <div className="w-full max-w-[400px]">
        <div className="h-fit w-full bg-background-base-02 rounded-[20px] px-[40px] pt-[16px] pb-[23px] flex-center gap-[16px] mt-[32px]">
          {customCheckData.map(({ day, isComplete }) => (
            <DayItem key={day} day={day} isComplete={isComplete} isLast={day === 5} />
          ))}
        </div>
      </div>
    )
  },
}
