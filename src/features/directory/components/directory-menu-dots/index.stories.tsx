import { Meta, StoryObj } from '@storybook/react'
import DirectoryMenuDots from '.'
import { DocumentProvider } from '@/features/document/contexts/document-context'
import ClientLayout from '@/shared/components/custom/client-layout'

const meta = {
  title: 'document/DirectoryMenuDots',
  component: DirectoryMenuDots,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ClientLayout>
        <DocumentProvider>
          <div className="relative mx-auto max-w-mobile p-4">
            <div className="absolute bottom-0 right-0">
              <Story />
            </div>
          </div>
        </DocumentProvider>
      </ClientLayout>
    ),
  ],
} satisfies Meta<typeof DirectoryMenuDots>

export default meta

type Story = StoryObj<typeof DirectoryMenuDots>

export const Default: Story = {}
