import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import StarInstructionDrawer from '.'

const meta: Meta<typeof StarInstructionDrawer> = {
  title: 'payment/StarInstructionDrawer',
  component: StarInstructionDrawer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof StarInstructionDrawer>

export const Default: Story = {
  render: () => <StarInstructionDrawer />,
}
