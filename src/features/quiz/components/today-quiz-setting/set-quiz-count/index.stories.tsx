import { Meta, StoryObj } from '@storybook/react'
import { useEffect } from 'react'
import SetQuizCount from '.'
import {
  TodayQuizSettingProvider,
  useTodayQuizSetting,
} from '../../../context/today-quiz-setting-context'

const meta: Meta<typeof SetQuizCount> = {
  title: 'today-quiz-setting/SetQuizCount',
  component: SetQuizCount,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TodayQuizSettingProvider>
        <div className="mx-auto max-w-mobile">
          <Story />
        </div>
      </TodayQuizSettingProvider>
    ),
  ],
  argTypes: {
    quizCount: {
      control: { type: 'number', min: 5, max: 20 },
      description: '설정할 문제 수',
      defaultValue: 10,
    },
  },
} satisfies Meta<typeof SetQuizCount>

export default meta

type Story = StoryObj<typeof SetQuizCountWithArgs>

export const Default: Story = {
  args: {
    quizCount: 10,
  },
  render: (args) => <SetQuizCountWithArgs {...args} />,
}

const SetQuizCountWithArgs = ({ quizCount: initialCount }: { quizCount: number }) => {
  const { setQuizCount } = useTodayQuizSetting()

  useEffect(() => {
    setQuizCount(initialCount)
  }, [initialCount, setQuizCount])

  return <SetQuizCount />
}
