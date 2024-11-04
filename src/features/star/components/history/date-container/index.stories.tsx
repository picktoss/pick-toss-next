import { Meta, StoryObj } from '@storybook/react'
import DateContainer from '.'
import ListItem from '../list-item'

const meta: Meta<typeof DateContainer> = {
  title: 'star-history/DateContainer',
  component: DateContainer,
  tags: ['autodocs'],
  argTypes: {
    date: {
      control: 'text',
      description: '표시할 날짜를 나타냅니다',
    },
    isFirst: {
      control: 'boolean',
      description: '해당 컨테이너가 첫 번째 요소인지 여부를 결정합니다',
    },
  },
} satisfies Meta<typeof DateContainer>

export default meta

type Story = StoryObj<typeof DateContainer>

export const Default: Story = {
  args: {
    date: '2023-10-25',
    isFirst: false,
  },
  render: (args) => (
    <DateContainer {...args}>
      <ListItem
        isLast={false}
        type="payment"
        star={20}
        content="별 20개 구매"
        description="토스페이 2,500원 결제"
      />
      <ListItem
        isLast={false}
        type="reward"
        star={5}
        content="오늘의 퀴즈 보상"
        description="연속 2일 출석 완료"
      />
      <ListItem
        isLast
        type="expend"
        star={30}
        content="30문제 생성"
        description="전공 공부 > 중간고사"
      />
    </DateContainer>
  ),
}
