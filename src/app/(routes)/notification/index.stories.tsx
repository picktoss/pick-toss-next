import { Meta, StoryObj } from '@storybook/react'
import Header from './@header/default'
import Layout from './layout'
import NotificationPage from './page'

const meta = {
  title: 'Page/Notification',
  component: NotificationPage,
  parameters: {
    layout: 'fullscreen',
    nextjs: { appDirectory: true },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-mobile">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NotificationPage>

export default meta

type Story = StoryObj<typeof NotificationPage>

export const Default: Story = {
  render: () => (
    <Layout header={<Header />}>
      <NotificationPage />
    </Layout>
  ),
}
