import { Meta, StoryObj } from '@storybook/react'
import DeleteDocumentDialog from '.'

const meta: Meta<typeof DeleteDocumentDialog> = {
  title: 'document/DeleteDocumentDialog',
  component: DeleteDocumentDialog,
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

type Story = StoryObj<typeof DeleteDocumentDialog>

export const Default: Story = {}
