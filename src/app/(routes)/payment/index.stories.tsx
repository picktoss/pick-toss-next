import React from 'react'
import { Meta, StoryFn, StoryObj } from '@storybook/react'
import PaymentPage from './page'
import Layout from './layout'

const meta: Meta<typeof PaymentPage> = {
  title: 'Page/PaymentPage', // Storybook 내에서 보여질 경로
  component: PaymentPage,
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
}

export default meta
type Story = StoryObj<typeof PaymentPage>

export const Default: Story = {
  render: () => (
    <Layout>
      <PaymentPage />
    </Layout>
  ),
}
