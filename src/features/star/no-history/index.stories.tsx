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
    activeTab: {
      control: 'select',
      options: ['all', 'payment', 'expend', 'reward'],
      description: '활성화된 탭을 설정합니다.',
      defaultValue: 'all',
    },
  },
} satisfies Meta<typeof NoHistory>

export default meta

export const Default: StoryObj<typeof NoHistory> = {
  render: (args) => <NoHistory {...args} />,
}
