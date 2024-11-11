import { Meta, StoryObj } from '@storybook/react'
import SearchPage from './page'

const meta: Meta<typeof SearchPage> = {
  title: 'Page/SearchPage',
  component: SearchPage,
  parameters: {
    nextjs: { appDirectory: true },
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-mobile">
        <Story />
      </div>
    ),
  ],
}

export default meta

export const Default: StoryObj<typeof SearchPage> = {}
