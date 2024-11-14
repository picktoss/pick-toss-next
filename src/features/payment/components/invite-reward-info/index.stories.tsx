import { Meta, StoryObj } from '@storybook/react'
import InviteRewardInfo from '.'

const meta = {
  title: 'payment/InviteRewardInfo',
  component: InviteRewardInfo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof InviteRewardInfo>

export default meta

type Story = StoryObj<typeof InviteRewardInfo>

// 기본 스토리
export const Default: Story = {}
