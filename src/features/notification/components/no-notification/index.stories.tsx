import { Meta, StoryObj } from '@storybook/react'
import NoNotification from '.'

const meta = {
  title: 'notification/NoNotification',
  component: NoNotification,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '알림이 없을 때 렌더링되는 컴포넌트입니다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-mobile p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NoNotification>

export default meta

type Story = StoryObj<typeof NoNotification>

export const Default: Story = {}
