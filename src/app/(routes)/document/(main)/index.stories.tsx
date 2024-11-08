import { Meta, StoryObj } from '@storybook/react'
import Layout from './layout'
import Header from './@header/default'
import DirectoryPage from './page'

const meta = {
  title: 'Page/Directory',
  component: DirectoryPage,
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
} satisfies Meta<typeof DirectoryPage>

export default meta

export const Default: StoryObj<typeof DirectoryPage> = {
  render: () => (
    <Layout header={<Header />}>
      <DirectoryPage />
    </Layout>
  ),
}
