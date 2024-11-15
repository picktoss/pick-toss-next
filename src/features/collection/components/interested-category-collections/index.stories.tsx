import { Meta, StoryObj } from '@storybook/react'
import InterestedCategoryCollections from '.'

const meta = {
  title: 'main/InterestedCategoryCollections',
  component: InterestedCategoryCollections,
  tags: ['autodocs'],
  argTypes: {
    interestedCategory: {
      control: 'text',
      description: '설정된 관심 분야 이름',
    },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-mobile bg-gray-100 py-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InterestedCategoryCollections>

export default meta

type Story = StoryObj<typeof InterestedCategoryCollections>

// 관심분야가 설정되지 않은 상태
export const NoCategory: Story = {
  args: {
    interestedCategory: undefined,
  },
}

// 관심분야가 설정된 상태
export const WithCategory: Story = {
  args: {
    interestedCategory: 'IT/프로그래밍',
  },
}
