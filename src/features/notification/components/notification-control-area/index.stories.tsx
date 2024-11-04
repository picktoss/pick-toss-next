import { Meta, StoryObj } from '@storybook/react'
import NotificationControlArea from '.'
import { NotificationProvider } from '../../contexts/notification-context'

const meta: Meta<typeof NotificationControlArea> = {
  title: 'notification/NotificationControlArea',
  component: NotificationControlArea,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-mobile">
        <NotificationProvider>
          <Story />
        </NotificationProvider>
      </div>
    ),
  ],
  argTypes: {
    isKakaoUser: {
      control: 'boolean',
      description: '카카오 유저 여부에 따라 이메일 등록 기능 사용',
    },
  },
} satisfies Meta<typeof NotificationControlArea>

export default meta

export const Default: StoryObj<typeof NotificationControlArea> = {
  args: {
    isKakaoUser: true,
  },
}
