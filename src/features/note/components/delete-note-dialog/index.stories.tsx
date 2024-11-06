import { Meta, StoryObj } from '@storybook/react'
import DeleteNoteDialog from '.'

const meta: Meta<typeof DeleteNoteDialog> = {
  title: 'note/DeleteNoteDialog',
  component: DeleteNoteDialog,
  tags: ['autodocs'],
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
}

export default meta

type Story = StoryObj<typeof DeleteNoteDialog>

export const Default: Story = {}
