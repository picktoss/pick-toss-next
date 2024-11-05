import { Meta, StoryFn, StoryObj } from '@storybook/react'
import NotificationPage from './page'
import Layout from './layout'

const meta: Meta<typeof NotificationPage> = {
  title: 'Page/Notification',
  component: NotificationPage,
  parameters: {
    nextjs: { appDirectory: true },
  },
  decorators: [
    (Story: StoryFn) => (
      <div className="mx-auto max-w-mobile">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NotificationPage>

export default meta

export const Default: StoryObj<typeof NotificationPage> = {
  render: () => (
    <Layout>
      <NotificationPage />
    </Layout>
  ),
}
