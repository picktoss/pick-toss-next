import { Meta, StoryObj } from '@storybook/react'
import CountdownToMidnight from '.'

const meta = {
  title: 'main/CountdownToMidnight',
  component: CountdownToMidnight,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '오늘의 퀴즈가 도착하는 자정까지 남은 시간을 표시하는 컴포넌트입니다.',
      },
    },
  },
} satisfies Meta<typeof CountdownToMidnight>

export default meta

type Story = StoryObj<typeof CountdownToMidnight>

export const Default: Story = {}
