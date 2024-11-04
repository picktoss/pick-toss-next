import { Meta, StoryObj } from '@storybook/react'
import { useEffect, useState } from 'react'
import HistoryTab from '.'
import { Button } from '@/shared/components/ui/button'

const meta: Meta<typeof HistoryTab> = {
  title: 'star-history/HistoryTab',
  component: HistoryTab,
  parameters: {
    nextjs: { appDirectory: true },
  },
  tags: ['autodocs'],
  argTypes: {
    tab: {
      control: 'select',
      options: ['all', 'payment', 'expend', 'reward'],
      description: '활성화할 탭을 설정합니다.',
      defaultValue: 'all',
    },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-mobile">
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof HistoryTabWithArgs>

export const Default: Story = {
  args: {
    tab: 'all',
  },
  render: (args) => <HistoryTabWithArgs {...args} />,
}

// Storybook에서만 동작하는 `HistoryTabWithArgs` 컴포넌트
const HistoryTabWithArgs = ({ tab }: { tab: 'all' | 'payment' | 'expend' | 'reward' }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'payment' | 'expend' | 'reward'>(tab)

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const eventTarget = e.target as HTMLElement
    if (!eventTarget.id) return

    setActiveTab(eventTarget.id as 'all' | 'payment' | 'expend' | 'reward')
  }

  useEffect(() => {
    setActiveTab(tab)
  }, [tab])

  return (
    <div onClick={handleClick} className="flex items-center gap-[8px] px-[16px] py-[8px]">
      <Button
        id="all"
        variant={'smallRound'}
        colors={activeTab === 'all' ? 'selected' : 'outlined'}
        className="py-[7.5px]"
      >
        전체
      </Button>
      <Button
        id="payment"
        variant={'smallRound'}
        colors={activeTab === 'payment' ? 'selected' : 'outlined'}
        className="py-[7.5px]"
      >
        결제
      </Button>
      <Button
        id="expend"
        variant={'smallRound'}
        colors={activeTab === 'expend' ? 'selected' : 'outlined'}
        className="py-[7.5px]"
      >
        사용
      </Button>
      <Button
        id="reward"
        variant={'smallRound'}
        colors={activeTab === 'reward' ? 'selected' : 'outlined'}
        className="py-[7.5px]"
      >
        적립
      </Button>
    </div>
  )
}
