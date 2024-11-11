import { Meta, StoryObj } from '@storybook/react'
import MainTodayQuizArea from '.'

const meta = {
  title: 'main/MainTodayQuizArea',
  component: MainTodayQuizArea,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'radio',
      options: ['EMPTY', 'NOT_ARRIVED', 'ARRIVED'],
      description: '현재 상태에 따른 컴포넌트 렌더링',
    },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-mobile p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MainTodayQuizArea>

export default meta

type Story = StoryObj<typeof MainTodayQuizArea>

// 노트가 있지만 오늘의 퀴즈가 도착하지 않은 상태 (오늘 푼 퀴즈 + 다음 카운트다운)
export const NotArrived: Story = {
  args: {
    state: 'NOT_ARRIVED',
  },
}

// 노트가 없는 상태 (첫 노트 추가하기)
export const Empty: Story = {
  args: {
    state: 'EMPTY',
  },
}

// 노트가 있고 오늘의 퀴즈가 도착한 상태 (오늘의 퀴즈 도착)
export const Arrived: Story = {
  args: {
    state: 'ARRIVED',
  },
}
