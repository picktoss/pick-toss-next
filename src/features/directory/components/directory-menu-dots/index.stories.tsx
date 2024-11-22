import { Meta, StoryObj } from '@storybook/react'
import DirectoryMenuDots from '.'
import { DirectoryProvider } from '../../../document/contexts/document-context'

const meta = {
  title: 'document/DirectoryMenuDots',
  component: DirectoryMenuDots,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <DirectoryProvider>
        <div className="relative mx-auto max-w-mobile p-4">
          <div className="absolute bottom-0 right-0">
            <Story />
          </div>
        </div>
      </DirectoryProvider>
    ),
  ],
} satisfies Meta<typeof DirectoryMenuDots>

export default meta

type Story = StoryObj<typeof DirectoryMenuDots>

export const Default: Story = {}
