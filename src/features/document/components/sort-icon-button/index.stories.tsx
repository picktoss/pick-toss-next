import type { Meta, StoryObj } from '@storybook/react'
import SortIconBtn from '.'

const meta = {
  title: 'document/SortIconBtn',
  component: SortIconBtn,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    sortItems: {
      control: 'object',
      defaultValue: [
        { key: 'upload', label: '업로드한 날짜' },
        { key: 'open', label: '마지막으로 열어본 시간' },
      ],
    },
  },
} satisfies Meta<typeof SortIconBtn>

export default meta
type Story = StoryObj<typeof SortIconBtn>

export const Default: Story = {}
