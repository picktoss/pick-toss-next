import { Meta, StoryObj } from '@storybook/react'
import ReviewTop5Container from '.'

const meta = {
  title: 'main/ReviewTop5Container',
  component: ReviewTop5Container,
  tags: ['autodocs'],
  argTypes: {
    isEmpty: {
      control: 'boolean',
      description: '노트가 없는 경우 true, 있는 경우 false',
    },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-mobile bg-gray-100 p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ReviewTop5Container>

export default meta

type Story = StoryObj<typeof ReviewTop5Container>

// 노트가 없는 상태
export const Empty: Story = {
  args: {
    isEmpty: true,
  },
}

// 노트가 있는 상태 (TOP 5 노트 표시)
export const NotEmpty: Story = {
  args: {
    isEmpty: false,
  },
}
