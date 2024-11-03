import { Meta, StoryObj } from '@storybook/react'
import {
  TodayQuizSettingProvider,
  useTodayQuizSetting,
} from '../../context/today-quiz-setting-context'
import { useEffect } from 'react'
import SetNote from '.'

const meta: Meta<typeof SetNote> = {
  title: 'today-quiz-setting/SetNote',
  component: SetNote,
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
} satisfies Meta<typeof SetNote>

export default meta

type Story = StoryObj<typeof SetNoteWithArgs>

export const Default: Story = {
  args: {
    selectedFolderId: 0,
  },
  render: (args) => <SetNoteWithArgs {...args} />,
}

const SetNoteWithArgs = ({ selectedFolderId }: { selectedFolderId: number }) => {
  const { setSelectedFolderId } = useTodayQuizSetting()

  useEffect(() => {
    setSelectedFolderId(selectedFolderId)
  }, [selectedFolderId, setSelectedFolderId])

  return <SetNote />
}
