import { Meta, StoryObj } from '@storybook/react'
import SetCategoryCompleteDialog from '.'
import { useEffect, useState } from 'react'

const meta = {
  title: 'category/SetCategoryCompleteDialog',
  component: SetCategoryCompleteDialog,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean', description: '다이얼로그 열림 여부' },
    setIsOpen: { action: 'setIsOpen', description: '다이얼로그 상태 변경 핸들러' },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-mobile">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SetCategoryCompleteDialog>

export default meta
type Story = StoryObj<typeof SetCategoryCompleteDialog>

export const Default: Story = {
  args: {
    isOpen: true,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.isOpen)

    useEffect(() => {
      setIsOpen(args.isOpen)
    }, [args.isOpen])

    return <SetCategoryCompleteDialog {...args} isOpen={isOpen} setIsOpen={setIsOpen} />
  },
}
