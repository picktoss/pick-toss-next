import { Meta, StoryObj } from '@storybook/react'
import FixedBottom from '.'

const meta: Meta<typeof FixedBottom> = {
  title: 'today-quiz-setting/FixedBottom',
  component: FixedBottom,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-mobile">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FixedBottom>

export default meta

export const Default: StoryObj<typeof FixedBottom> = {}
