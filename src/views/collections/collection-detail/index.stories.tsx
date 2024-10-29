import type { Meta, StoryObj } from '@storybook/react'
import CollectionDetail from '.'

const meta = {
  title: 'Page/CollectionDetail',
  component: CollectionDetail,
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
} satisfies Meta<typeof CollectionDetail>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
