import { Meta, StoryObj } from '@storybook/react'
import MultipleOption from '.'

const meta: Meta<typeof MultipleOption> = {
  title: 'Quiz/MultipleOption',
  component: MultipleOption,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

const quiz = {
  id: '1',
  type: 'multiple',
  question: '식물기반 단백질 시장에서 대기업의 참여가 늘어나는 이유는 무엇인가요?',
  options: [
    '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다',
    '배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다',
    '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이',
    '기존의 배양육이 기존방식에서 육류보다 토양이 비축된다',
  ],
  answer: '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다',
  explanation: '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다',
}

export default meta

type Story = StoryObj<typeof MultipleOption>

export const Default: Story = {
  args: {
    condition: 'idle',
    index: 0,
    option: quiz.options[0],
  },
}

export const Disabled: Story = {
  args: {
    condition: 'disabled',
    index: 1,
    option: quiz.options[1],
  },
}

export const Wrong: Story = {
  args: {
    condition: 'wrong',
    index: 2,
    option: quiz.options[2],
  },
}

export const Correct: Story = {
  args: {
    condition: 'correct',
    index: 3,
    option: quiz.options[3],
  },
}
