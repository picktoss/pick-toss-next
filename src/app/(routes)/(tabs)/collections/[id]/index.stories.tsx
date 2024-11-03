import type { Meta, StoryObj } from '@storybook/react'
import CollectionDetailPage from './page'

const meta = {
  title: 'Page/CollectionDetail',
  component: CollectionDetailPage,
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
} satisfies Meta<typeof CollectionDetailPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
