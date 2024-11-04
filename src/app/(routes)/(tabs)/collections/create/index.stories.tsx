import type { Meta, StoryObj } from '@storybook/react'
import CreateCollectionPage from './page'

const meta = {
  title: 'Page/CreateCollection',
  component: CreateCollectionPage,
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
} satisfies Meta<typeof CreateCollectionPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
