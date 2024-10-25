import { Meta, StoryObj } from '@storybook/react'
import NoHistory from '.'

const meta: Meta<typeof NoHistory> = {
  title: 'star-history/NoHistory',
  component: NoHistory,
  tags: ['autodocs'],
  parameters: {
    nextjs: { appDirectory: true },
  },
  argTypes: {
    tab: {
      control: {
        type: 'select',
        options: ['all', 'payment', 'expend', 'reward'],
      },
    },
  },
} satisfies Meta<typeof NoHistory>

export default meta

export const Default: StoryObj<typeof NoHistory> = {
  args: {
    tab: 'all',
  },
}
