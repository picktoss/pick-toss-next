import type { Meta, StoryObj } from '@storybook/react'
import QuizTimer from '.'

const meta = {
  title: 'Quiz/QuizTimer',
  component: QuizTimer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '퀴즈 풀이 시간을 측정하고 표시하는 타이머 컴포넌트입니다. useTimer 훅을 사용하여 시간을 관리합니다.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof QuizTimer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isRunning: true,
  },
  parameters: {
    docs: {
      description: {
        story: '타이머가 실행 중인 기본 상태입니다.',
      },
    },
  },
}

export const Stopped: Story = {
  args: {
    isRunning: false,
  },
  parameters: {
    docs: {
      description: {
        story: '타이머가 정지된 상태입니다. 회색으로 표시됩니다.',
      },
    },
  },
}
