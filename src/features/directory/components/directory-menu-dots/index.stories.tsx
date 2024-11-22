import { Meta, StoryObj } from '@storybook/react'
import DirectoryMenuDots from '.'
import { DocumentProvider } from '@/features/document/contexts/document-context'

const meta = {
  title: 'document/DirectoryMenuDots',
  component: DirectoryMenuDots,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <DocumentProvider>
        <div className="relative mx-auto max-w-mobile p-4">
          <div className="absolute bottom-0 right-0">
            <Story />
          </div>
        </div>
      </DocumentProvider>
    ),
  ],
} satisfies Meta<typeof DirectoryMenuDots>

export default meta

type Story = StoryObj<typeof DirectoryMenuDots>

export const Default: Story = {}
