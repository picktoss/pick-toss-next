import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import ItemCard from '.'
import STARS_IN_BOX from '@/../../public/images/stars-in-box.png'
import STARS_IN_POCKET from '@/../../public/images/stars-in-pocket.png'
import Image from 'next/image'

// 스토리의 메타 정보 정의
const meta: Meta<typeof ItemCard> = {
  title: 'payment/ItemCard',
  component: ItemCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    tagMessage: { control: 'text' },
    starCount: { control: 'number' },
    bonusCount: { control: 'number' },
    paymentAmount: { control: 'number' },
  },
}

export default meta
type Story = StoryObj<typeof ItemCard>

// 기본 상품 카드
export const Default: Story = {
  args: {
    image: <Image src={STARS_IN_BOX} alt="" className="ml-[5px] h-[89px] w-auto" />,
    tagMessage: '+50% 보너스',
    starCount: 100,
    bonusCount: 40,
    paymentAmount: 25000,
  },
}

// 태그 메시지와 보너스가 없는 경우
export const WithoutTag: Story = {
  args: {
    image: <Image src={STARS_IN_POCKET} alt="" className="h-[89px] w-auto" />,
    starCount: 80,
    paymentAmount: 15000,
  },
}
