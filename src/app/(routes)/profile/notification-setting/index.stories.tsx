import { Meta, StoryFn, StoryObj } from '@storybook/react'
import NotificationSettingPage from './page'
import Layout from './layout'

const meta: Meta<typeof NotificationSettingPage> = {
  title: 'Page/NotificationSetting',
  component: NotificationSettingPage,
  parameters: {
    layout: 'fullscreen',
    nextjs: { appDirectory: true },
  },
  decorators: [
    (Story: StoryFn) => (
      <div className="mx-auto max-w-mobile">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NotificationSettingPage>

export default meta

export const Default: StoryObj<typeof NotificationSettingPage> = {
  render: () => (
    <Layout>
      <NotificationSettingPage />
    </Layout>
  ),
}
