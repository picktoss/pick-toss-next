import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import InviteRewardDrawer from '.'
import Tag from '@/shared/components/ui/tag'
import Text from '@/shared/components/ui/text'
import Icon from '@/shared/components/custom/icon'

const meta: Meta<typeof InviteRewardDrawer> = {
  title: 'payment/InviteReward',
  component: InviteRewardDrawer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof InviteRewardDrawer>

export const Default: Story = {
  render: () => (
    <InviteRewardDrawer
      triggerComponent={
        <button className="flex h-[56px] w-full items-center justify-between rounded-[12px] bg-background-container-03 px-[20px] py-[10px]">
          <div className="flex-center gap-[8px]">
            <Tag className="bg-fill-primary-blue">EVENT</Tag>
            <Text typography="text1-bold" className="text-text-info">
              친구 초대하고 픽토스 PRO 이용하기
            </Text>
          </div>
          <Icon name="chevron-right" className="size-[16px] text-icon-tertiary" />
        </button>
      }
    />
  ),
}
