import { Meta, StoryObj } from '@storybook/react'
import DeleteDocumentSwipeButton from '.'

const meta = {
  title: 'document/DeleteDocumentSwipeButton',
  component: DeleteDocumentSwipeButton,
  tags: ['autodocs'],
  argTypes: {
    documentId: { control: 'number', description: '노트의 id' },
    quizCount: { control: 'number', description: '노트에서 생성된 퀴즈의 수' },
  },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-mobile p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DeleteDocumentSwipeButton>

export default meta

type Story = StoryObj<typeof DeleteDocumentSwipeButton>

export const Default: Story = {}
