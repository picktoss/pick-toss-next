import type { Meta, StoryObj } from '@storybook/react'
import ResultQuizErrorDialog from '.'

const meta = {
  title: 'Quiz/ResultQuizErrorDialog',
  component: ResultQuizErrorDialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '퀴즈 오류를 신고할 수 있는 다이얼로그입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ResultQuizErrorDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { onNext: () => {} },
}
