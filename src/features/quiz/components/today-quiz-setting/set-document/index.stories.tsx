import { Meta, StoryObj } from '@storybook/react'
import {
  TodayQuizSettingProvider,
  useTodayQuizSetting,
} from '../../../context/today-quiz-setting-context'
import { useEffect } from 'react'
import SetDocument from '.'

const meta: Meta<typeof SetDocument> = {
  title: 'today-quiz-setting/SetDocument',
  component: SetDocument,
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
} satisfies Meta<typeof SetDocument>

export default meta

type Story = StoryObj<typeof SetDocumentWithArgs>

export const Default: Story = {
  args: {
    selectedDirectoryId: 0,
  },
  render: (args) => <SetDocumentWithArgs {...args} />,
}

const SetDocumentWithArgs = ({ selectedDirectoryId }: { selectedDirectoryId: number }) => {
  const { setSelectedDirectoryId } = useTodayQuizSetting()

  useEffect(() => {
    setSelectedDirectoryId(selectedDirectoryId)
  }, [selectedDirectoryId, setSelectedDirectoryId])

  return <SetDocument />
}
