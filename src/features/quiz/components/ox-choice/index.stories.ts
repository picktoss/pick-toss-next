import { Meta, StoryObj } from '@storybook/react'
import OXChoice from '.'

const meta: Meta<typeof OXChoice> = {
  title: 'Quiz/OXChoice',
  component: OXChoice,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onSelect: { action: 'selected' },
  },
}

export default meta

type Story = StoryObj<typeof OXChoice>

// 초기 상태 (선택하지 않은 상태)
export const Idle: Story = {
  args: {
    condition: 'idle',
  },
}

// 정답이 O이고 O를 선택한 경우 (정답)
export const CorrectO: Story = {
  args: {
    condition: 'correct',
    answer: 'O',
  },
}

// 정답이 X이고 X를 선택한 경우 (정답)
export const CorrectX: Story = {
  args: {
    condition: 'correct',
    answer: 'X',
  },
}

// 정답이 O인데 X를 선택한 경우 (오답)
export const WrongSelectedX: Story = {
  args: {
    condition: 'wrong',
    answer: 'X', // X를 선택했지만 O가 정답
  },
}

// 정답이 X인데 O를 선택한 경우 (오답)
export const WrongSelectedO: Story = {
  args: {
    condition: 'wrong',
    answer: 'O', // O를 선택했지만 X가 정답
  },
}

Idle.parameters = {
  docs: {
    description: {
      story: 'OX 선택지가 표시된 초기 상태입니다. 사용자가 아직 선택하지 않은 상태입니다.',
    },
  },
}

CorrectO.parameters = {
  docs: {
    description: {
      story: '정답이 O이고 사용자가 O를 선택한 경우입니다. O 버튼이 초록색으로 표시됩니다.',
    },
  },
}

CorrectX.parameters = {
  docs: {
    description: {
      story: '정답이 X이고 사용자가 X를 선택한 경우입니다. X 버튼이 초록색으로 표시됩니다.',
    },
  },
}

WrongSelectedX.parameters = {
  docs: {
    description: {
      story:
        '정답이 O인데 사용자가 X를 선택한 경우입니다. X 버튼이 빨간색으로, O 버튼이 초록색으로 표시됩니다.',
    },
  },
}

WrongSelectedO.parameters = {
  docs: {
    description: {
      story:
        '정답이 X인데 사용자가 O를 선택한 경우입니다. O 버튼이 빨간색으로, X 버튼이 초록색으로 표시됩니다.',
    },
  },
}
