import { Meta, StoryObj } from '@storybook/react'
import InterestedCategoryItemCard from '.'

const meta = {
  title: 'collection/InterestedCategoryItemCard',
  component: InterestedCategoryItemCard,
  tags: ['autodocs'],
  argTypes: {
    emoji: {
      control: 'text',
      description: '컬렉션의 이모지',
    },
    title: {
      control: 'text',
      description: '컬렉션 제목',
    },
    isBookmarked: {
      control: 'boolean',
      description: '북마크 여부',
    },
    bookmarkCount: {
      control: 'number',
      description: '북마크 수',
    },
    quizCount: {
      control: 'number',
      description: '퀴즈 수',
    },
  },
  decorators: [
    (Story) => (
      <div className="flex-center mx-auto max-w-mobile bg-gray-100 py-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InterestedCategoryItemCard>

export default meta

type Story = StoryObj<typeof InterestedCategoryItemCard>

export const Default: Story = {
  args: {
    emoji: '🎨',
    title: '현대 예술 퀴즈',
    isBookmarked: false,
    bookmarkCount: 120,
    quizCount: 8,
  },
}

export const Bookmarked: Story = {
  args: {
    emoji: '📚',
    title: '한국 문학',
    isBookmarked: true,
    bookmarkCount: 45,
    quizCount: 5,
  },
}
