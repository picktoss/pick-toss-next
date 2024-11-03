import { Meta, StoryObj } from '@storybook/react'
import TodayQuizSettingPage from './page'
import { TodayQuizSettingProvider } from '@/features/quiz/today-quiz-setting/context/today-quiz-setting-context'

const meta: Meta<typeof TodayQuizSettingPage> = {
  title: 'Page/TodayQuizSetting',
  component: TodayQuizSettingPage,
  parameters: {
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
  render: () => <TodayQuizSettingPage />,
}
