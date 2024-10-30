import { Meta, StoryObj } from '@storybook/react'
import { TodayQuizSettingProvider } from './context/today-quiz-setting-context'
import TodayQuizSetting from '.'

const meta: Meta<typeof TodayQuizSetting> = {
  title: 'Page/TodayQuizSetting',
  component: TodayQuizSetting,
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

type Story = StoryObj<typeof TodayQuizSetting>

export const Default: Story = {
  render: () => <TodayQuizSetting />,
}
