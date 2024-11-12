import { Meta, StoryObj } from '@storybook/react'
import ReviewTop5Item from '.'

const meta = {
  title: 'main/ReviewTop5Item',
  component: ReviewTop5Item,
  tags: ['autodocs'],
  argTypes: {
    ranking: {
      control: 'number',
      description: '노트의 랭킹을 설정합니다 (1~5)',
    },
    documentTitle: {
      control: 'text',
      description: '노트의 제목',
    },
    directory: {
      control: 'text',
      description: '노트가 속한 디렉터리명',
    },
    reviewCount: {
      control: 'number',
      description: '복습이 필요한 횟수 (선택 사항)',
    },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-mobile p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ReviewTop5Item>

export default meta

type Story = StoryObj<typeof ReviewTop5Item>

// 기본 상태 (복습이 필요한 횟수가 주어진 경우)
export const Default: Story = {
  args: {
    ranking: 1,
    documentTitle: '중간고사 요점정리',
    directory: '전공공부',
    reviewCount: 7,
  },
}

// 복습 횟수가 없는 상태
export const NoNeededReviewCount: Story = {
  args: {
    ranking: 4,
    documentTitle: '4/3 노트필기',
    directory: '컴활 필기 준비',
  },
}
