import { Meta, StoryObj } from '@storybook/react'
import Header from './default'

const meta: Meta<typeof Header> = {
  title: 'inquiry/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    nextjs: { appDirectory: true },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-mobile">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof Header>

export const Default: Story = {
  render: () => <Header />,
}
