import { Meta, StoryObj } from '@storybook/react'
import { QuizNoteProvider } from '../../contexts/quiz-note-context'
import FolderMenuDots from '.'

const meta: Meta<typeof FolderMenuDots> = {
  title: 'note/FolderMenuDots',
  component: FolderMenuDots,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <QuizNoteProvider>
        <div className="relative mx-auto max-w-mobile p-4">
          <div className="absolute bottom-0 right-0">
            <Story />
          </div>
        </div>
      </QuizNoteProvider>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof FolderMenuDots>

export const Default: Story = {}
