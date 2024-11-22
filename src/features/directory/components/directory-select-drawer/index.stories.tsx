import { Meta, StoryObj } from '@storybook/react'
import DirectorySelectDrawer from '.'

const meta = {
  title: 'document/DirectorySelectDrawer',
  component: DirectorySelectDrawer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DirectorySelectDrawer>

export default meta
type Story = StoryObj<typeof DirectorySelectDrawer>

export const Default: Story = {
  args: {},
}
