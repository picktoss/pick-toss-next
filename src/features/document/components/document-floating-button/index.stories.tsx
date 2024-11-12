import { Meta, StoryObj } from '@storybook/react'
import DocumentFloatingButton from '.'

const meta = {
  title: 'document/DocumentFloatingButton',
  component: DocumentFloatingButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="h-[150px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DocumentFloatingButton>

export default meta
type Story = StoryObj<typeof DocumentFloatingButton>

export const Default: Story = {}
