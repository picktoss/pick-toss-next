import { Meta, StoryObj } from '@storybook/react'
import MoveDocumentDrawer from '.'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import Icon from '@/shared/components/custom/icon'

// 스토리북 메타 데이터 설정
const meta = {
  title: 'document/MoveDocumentDrawer',
  component: MoveDocumentDrawer,
  tags: ['autodocs'],
  argTypes: {
    triggerComponent: {
      control: false,
    },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-mobile">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MoveDocumentDrawer>

export default meta
type Story = StoryObj<typeof MoveDocumentDrawer>

// 기본 상태: 드롭다운 메뉴의 노트 이동 버튼
export const DropdownMenu: Story = {
  args: {
    triggerComponent: (
      <button
        className={cn(
          'border-b border-border-divider w-[240px] px-[20px] py-[16px] cursor-pointer'
        )}
      >
        <Text typography="subtitle2-medium" className="flex w-full items-center justify-between">
          노트 이동
          <Icon name="move" className="size-[20px]" />
        </Text>
      </button>
    ),
  },
}

// swipeable card의 이동 버튼
export const SwipeCard: Story = {
  render: () => (
    <MoveDocumentDrawer
      triggerComponent={
        <button className="flex-center w-[72px] flex-col rounded-lg bg-background-container-03 p-2 text-text1-medium text-text-info">
          <Icon name="move" className="mb-[4px]" />
          이동
        </button>
      }
    />
  ),
}
