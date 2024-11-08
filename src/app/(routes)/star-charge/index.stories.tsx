import React from 'react'
import { Meta, StoryFn, StoryObj } from '@storybook/react'
import StarChargePage from './page'
import Layout from './layout'
import StarChargeHeader from '@/features/payment/components/star-charge/star-charge-header'

const meta: Meta<typeof StarChargePage> = {
  title: 'Page/StarChargePage', // Storybook 내에서 보여질 경로
  component: StarChargePage,
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
type Story = StoryObj<typeof StarChargePage>

export const Default: Story = {
  render: () => (
    <Layout>
      <StarChargePage />
    </Layout>
  ),
}
