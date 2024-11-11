import { Meta, StoryObj } from '@storybook/react'
import TodayQuizSettingPage from './page'
import { TodayQuizSettingProvider } from '@/features/quiz/context/today-quiz-setting-context'
import Layout from './layout'

const meta: Meta<typeof TodayQuizSettingPage> = {
  title: 'Page/TodayQuizSetting',
  component: TodayQuizSettingPage,
  parameters: {
    layout: 'fullscreen',
    nextjs: { appDirectory: true },
  },
  decorators: [
    (Story) => (
      <TodayQuizSettingProvider>
        <div className="mx-auto max-w-mobile">
          <Story />
        </div>
      </TodayQuizSettingProvider>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof TodayQuizSettingPage>

export const Default: Story = {
  render: () => (
    <Layout>
      <TodayQuizSettingPage />
    </Layout>
  ),
}
