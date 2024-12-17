import { Meta, StoryObj } from '@storybook/react'
import NotificationControlArea from '.'
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

const meta: Meta<typeof NotificationControlArea> = {
  title: 'notification/NotificationControlArea',
  component: NotificationControlArea,
  tags: ['autodocs'],
  parameters: {
    nextjs: { appDirectory: true },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-mobile">
        <NotificationProvider user={user}>
          <Story />
        </NotificationProvider>
      </div>
    ),
  ],
} satisfies Meta<typeof NotificationControlArea>

export default meta

export const Default: StoryObj<typeof NotificationControlArea> = {}
