// SetEmailDialog.stories.tsx
import { Meta, StoryObj } from '@storybook/react'
import SetEmailDialog from '.'
import { useEffect, useState } from 'react'
import { NotificationProvider } from '../contexts/notification-context'

const meta: Meta<typeof SetEmailDialog> = {
  title: 'notification/SetEmailDialog',
  component: SetEmailDialog,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <NotificationProvider>
        <Story />
      </NotificationProvider>
    ),
  ],
  argTypes: {
    isOpen: { control: 'boolean', description: '다이얼로그 열림 여부' },
    setIsOpen: { action: 'setIsOpen', description: '다이얼로그 상태 변경 핸들러' },
  },
} satisfies Meta<typeof SetEmailDialog>

export default meta
type Story = StoryObj<typeof SetEmailDialog>

export const Default: Story = {
  args: {
    isOpen: true,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.isOpen)

    useEffect(() => {
      setIsOpen(args.isOpen)
    }, [args.isOpen])

    return <SetEmailDialog {...args} isOpen={isOpen} setIsOpen={setIsOpen} />
  },
}
