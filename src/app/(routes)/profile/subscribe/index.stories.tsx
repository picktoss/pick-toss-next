import { Meta, StoryObj } from '@storybook/react'
import Layout from './layout'
import Header from './@header/default'
import SubscribePage from './page'

const meta: Meta<typeof SubscribePage> = {
  title: 'Page/StarHistory',
  component: SubscribePage,
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
} satisfies Meta<typeof SubscribePage>

export default meta

export const Default: StoryObj<typeof SubscribePage> = {
  render: () => (
    <Layout header={<Header />}>
      <SubscribePage />
    </Layout>
  ),
}
