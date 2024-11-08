import { Meta, StoryObj } from '@storybook/react'
import StarHistoryPage from './page'
import Layout from './layout'
import Header from './@header/default'

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

export const Default: StoryObj<typeof StarHistoryPage> = {
  render: () => (
    <Layout header={<Header />}>
      <StarHistoryPage />
    </Layout>
  ),
}
