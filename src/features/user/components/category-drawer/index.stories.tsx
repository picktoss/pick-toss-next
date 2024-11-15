import { Meta, StoryObj } from '@storybook/react'
import CategoryDrawer from '.'

const meta: Meta<typeof CategoryDrawer> = {
  title: 'profile/CategoryDrawer',
  component: CategoryDrawer,
  tags: ['autodocs'],
  argTypes: {
    interestedCategory: { control: 'text', description: '관심분야 카테고리 텍스트' },
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

type Story = StoryObj<typeof CategoryDrawer>

export const Default: Story = {
  args: {
    interestedCategory: 'IT/프로그래밍',
  },
}

export const NoCategory: Story = {
  args: {
    interestedCategory: undefined,
  },
}
