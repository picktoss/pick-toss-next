import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import TodayQuizPage from './page'
import Layout from './layout'

const meta = {
  title: 'Page/TodayQuiz',
  component: TodayQuizPage,
  parameters: {
    nextjs: { appDirectory: true },
  },
  decorators: [
    (Story: StoryFn) => (
      <div className="mx-auto max-w-mobile">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TodayQuizPage>

export default meta
type Story = StoryObj<typeof TodayQuizPage>

export const Default: Story = {
  render: () => (
    <Layout>
      <TodayQuizPage />
    </Layout>
  ),
}
