import type { Meta, StoryObj } from '@storybook/react'
import CollectionDetailPage from './page'
import Layout from './layout'
import Header from './@header/default'

const meta = {
  title: 'Page/CollectionDetail',
  component: CollectionDetailPage,
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
} satisfies Meta<typeof CollectionDetailPage>

export default meta
type Story = StoryObj<typeof meta>

// build error가 발생해 임시로 수정해두었습니다
export const Default: Story = {
  args: {
    params: {
      id: 'collectionId',
    },
  },
  render: () => (
    <Layout header={<Header />}>
      <CollectionDetailPage params={{ id: 'collectionId' }} />
    </Layout>
  ),
}
