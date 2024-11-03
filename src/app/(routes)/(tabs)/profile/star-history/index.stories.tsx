import { Meta, StoryObj } from '@storybook/react'
import StarHistoryPage from './page'

const meta: Meta<typeof StarHistoryPage> = {
  title: 'Page/StarHistory',
  component: StarHistoryPage,
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
} satisfies Meta<typeof StarHistoryPage>

export default meta

export const Default: StoryObj<typeof StarHistoryPage> = {}
