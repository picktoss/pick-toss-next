import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import InviteReward from '.'

const meta: Meta<typeof InviteReward> = {
  title: 'star/InviteReward',
  component: InviteReward,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof InviteReward>

export const Default: Story = {
  render: () => <InviteReward />,
}
