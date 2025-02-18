import { Meta, StoryObj } from '@storybook/react'
import NotificationItem from '.'

// 기본 날짜 예시를 위해 현재 시간을 기준으로 설정
const currentDate = new Date().toISOString()

const meta = {
  title: 'notification/NotificationItem',
  component: NotificationItem,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['TODAY_QUIZ', 'ANALYSIS', 'SYSTEM', 'REWARD'],
      description: '알림 타입',
    },
    title: {
      control: 'text',
      description: '알림 제목',
    },
    content: {
      control: 'text',
      description: '알림 내용',
    },
    date: {
      control: 'text',
      description: '알림 날짜 (YYYY-MM-DDT00:00:00.000 형식)',
    },
    isFirst: {
      control: 'boolean',
      description: '리스트의 첫번째 요소 여부',
    },
    isLast: {
      control: 'boolean',
      description: '리스트의 마지막 요소 여부',
    },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto flex w-full max-w-mobile flex-col p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NotificationItem>

export default meta

type Story = StoryObj<typeof NotificationItem>

// TODAY_QUIZ 타입의 기본 스토리
export const TodayQuizNotification: Story = {
  args: {
    type: 'TODAY_QUIZ',
    title: '오늘의 퀴즈 도착!',
    content: '새로운 퀴즈가 도착했습니다. 지금 확인해보세요!',
    date: currentDate,
    isFirst: false,
    isLast: false,
  },
}

// SYSTEM 타입의 알림 스토리
export const UpdateNewsNotification: Story = {
  args: {
    type: 'UPDATE_NEWS',
    title: '시스템 점검 공지',
    content: '내일 오전 2시에 시스템 점검이 예정되어 있습니다.',
    date: currentDate,
    isFirst: false,
    isLast: false,
  },
}

// 마지막 알림(REWARD 타입)
export const LastRewardNotification: Story = {
  args: {
    type: 'STAR_REWARD',
    title: '보상 지급 완료',
    content: '친구 초대 보상이 지급되었습니다.',
    date: currentDate,
    isFirst: false,
    isLast: false,
  },
}
