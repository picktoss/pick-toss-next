import { Meta, StoryObj } from '@storybook/react'
import CategoryDrawer from '.'

const meta: Meta<typeof CategoryDrawer> = {
  title: 'profile/CategoryDrawer',
  component: CategoryDrawer,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-mobile p-4">
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof CategoryDrawer>

export const Default: Story = {
  args: {
    isOpen: false,
  },
}

export const DialogOpen: Story = {
  args: {
    isOpen: true,
  },
}
