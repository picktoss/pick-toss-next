// SetEmailDialog.stories.tsx
import { Meta, StoryObj } from '@storybook/react'
import SetEmailDialog from '.'
import { useEffect, useState } from 'react'
import { NotificationProvider } from '../../contexts/notification-context'

const user = {
  id: 1,
  name: '픽토스',
  email: 'picktoss@email.com',
  socialPlatform: 'GOOGLE',
  role: 'ROLE_USER',
  interestCategories: ['IT'],
  documentUsage: {
    possessDocumentCount: 10,
    maxPossessDocumentCount: 40,
  },
  star: 30,
  quizNotificationEnabled: true,
} as User.Info

const meta: Meta<typeof SetEmailDialog> = {
  title: 'notification/SetEmailDialog',
  component: SetEmailDialog,
  tags: ['autodocs'],
  parameters: {
    nextjs: { appDirectory: true },
  },
  decorators: [
    (Story) => (
      <NotificationProvider user={user}>
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
