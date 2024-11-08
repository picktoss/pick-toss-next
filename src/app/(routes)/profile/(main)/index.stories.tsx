import { Meta, StoryObj } from '@storybook/react'
import ProfilePage from './page'
import Layout from './layout'

const meta: Meta<typeof ProfilePage> = {
  title: 'Page/ProfilePage',
  component: ProfilePage,
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

export const Default: StoryObj<typeof ProfilePage> = {
  render: () => (
    <Layout>
      <ProfilePage />
    </Layout>
  ),
}
