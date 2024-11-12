import { Meta, StoryObj } from '@storybook/react'
import AddFirstDocument from '.'

const meta = {
  title: 'document/AddFirstDocument',
  component: AddFirstDocument,
  tags: ['autodocs'],
  argTypes: {
    userName: {
      control: 'text',
      description: '사용자 이름',
      defaultValue: '픽토스',
    },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-mobile p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AddFirstDocument>

export default meta

type Story = StoryObj<typeof AddFirstDocument>

export const Default: Story = {
  args: {
    userName: '픽토스',
  },
}
