import { Meta, StoryObj } from '@storybook/react'
import CountdownToMidnight from '.'

const meta = {
  title: 'main/CountdownToMidnight',
  component: CountdownToMidnight,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-mobile p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CountdownToMidnight>

export default meta

type Story = StoryObj<typeof CountdownToMidnight>

export const Default: Story = {}
