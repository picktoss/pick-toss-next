import { Meta, StoryObj } from '@storybook/react'
import SetInterestedCategoryDrawer from '.'
import { Button } from '@/shared/components/ui/button'
import Text from '@/shared/components/ui/text'
import Icon from '@/shared/components/custom/icon'

const meta = {
  title: 'category/SetInterestedCategoryDrawer',
  component: SetInterestedCategoryDrawer,
  tags: ['autodocs'],
  argTypes: {
    triggerComponent: {
      control: undefined,
      description: 'Drawer를 여는 트리거 컴포넌트',
    },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-mobile p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SetInterestedCategoryDrawer>

export default meta

type Story = StoryObj<typeof SetInterestedCategoryDrawer>

export const Default: Story = {
  args: {
    triggerComponent: <Button variant={'mediumRound'}>관심분야 설정하기</Button>,
  },
}

export const Profile: Story = {
  args: {
    triggerComponent: (
      <button className="flex w-full items-center justify-between">
        <div className="flex flex-col items-start gap-[4px]">
          <Text typography="text2-medium" className="text-text-sub">
            관심분야
          </Text>

          <Text typography="subtitle2-medium" className="text-text-caption">
            관심분야를 등록해주세요
          </Text>
        </div>
        <Icon name="chevron-right" className="size-[16px] text-icon-tertiary" />
      </button>
    ),
  },
}
