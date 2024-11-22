import { Meta, StoryObj } from '@storybook/react'
import Layout from './layout'
import Header from './@header/default'
import DirectoryPage from './page'
import ClientLayout from '@/shared/components/custom/client-layout'

const meta = {
  title: 'Page/Directory',
  component: DirectoryPage,
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
} satisfies Meta<typeof DirectoryPage>

export default meta

export const Default: StoryObj<typeof DirectoryPage> = {
  render: () => (
    <ClientLayout>
      <Layout header={<Header />}>
        <DirectoryPage />
      </Layout>
    </ClientLayout>
  ),
}
