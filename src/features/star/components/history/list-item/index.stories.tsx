import { Meta, StoryObj } from '@storybook/react'
import ListItem from '.'

const meta: Meta<typeof ListItem> = {
  title: 'star-history/ListItem',
  component: ListItem,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['payment', 'reward', 'expend'],
      description: '항목의 유형을 선택합니다',
    },
    isLast: {
      control: 'boolean',
      description: '해당 항목이 리스트의 마지막인지 여부를 결정합니다',
    },
    star: {
      control: 'number',
      description: '별의 수를 나타냅니다',
    },
    content: {
      control: 'text',
      description: '항목의 제목을 설정합니다',
    },
    description: {
      control: 'text',
      description: '항목의 설명을 설정합니다',
    },
    detail: {
      control: 'text', // 임시 값
      description: '주문 상세 내용을 포함할 때 버튼을 표시합니다',
    },
  },
} satisfies Meta<typeof ListItem>

export default meta

// 기본 (적립)
export const Default: StoryObj<typeof ListItem> = {
  args: {
    isLast: true,
    type: 'reward',
    star: 5,
    content: '오늘의 퀴즈 보상',
    description: '연속 2일 출석 완료',
  },
}

// 결제
export const PaymentItem: StoryObj<typeof ListItem> = {
  args: {
    isLast: false,
    type: 'payment',
    star: 20,
    content: '별 20개 구매',
    description: '토스페이 2,500원 결제',
    detail: '주문 상세 보기',
  },
}

// 사용
export const ExpendItem: StoryObj<typeof ListItem> = {
  args: {
    isLast: false,
    type: 'expend',
    star: 30,
    content: '30문제 생성',
    description: '전공 공부 > 중간고사',
  },
}
