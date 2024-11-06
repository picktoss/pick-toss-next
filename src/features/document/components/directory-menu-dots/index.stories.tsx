import { Meta, StoryObj } from '@storybook/react'
import { DirectoryProvider } from '../../contexts/directory-context'
import DirectoryMenuDots from '.'

const meta: Meta<typeof DirectoryMenuDots> = {
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
}

export default meta

type Story = StoryObj<typeof DirectoryMenuDots>

export const Default: Story = {}
