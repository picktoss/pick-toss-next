import type { Meta, StoryObj } from '@storybook/react'
import QuizCard from '.'

const meta = {
  title: 'collections/QuizCard',
  component: QuizCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof QuizCard>

export default meta
type Story = StoryObj<typeof meta>

const multipleQuiz: Quiz.Item = {
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

const oxQuiz: Quiz.Item = {
  id: '2',
  type: 'ox',
  question: '식물기반 단백질 시장에서 대기업의 참여가 늘어나는 이유는 무엇인가요?',
  answer: 'O',
  explanation: '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다',
}

// Default states
export const DefaultMultiple: Story = {
  args: { quiz: multipleQuiz },
}

export const DefaultOX: Story = {
  args: { quiz: oxQuiz },
}

// With header and menu
export const WithHeaderMenu: Story = {
  args: {
    quiz: multipleQuiz,
    header: '오답',
    showMenu: true,
  },
}

// Multiple Choice - Answer States
export const MultipleShowAnswer: Story = {
  args: {
    quiz: multipleQuiz,
    showAnswer: true,
  },
}

export const MultipleCorrectUserAnswer: Story = {
  args: {
    quiz: multipleQuiz,
    showAnswer: true,
    userAnswer: '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다',
  },
}

export const MultipleWrongUserAnswer: Story = {
  args: {
    quiz: multipleQuiz,
    showAnswer: true,
    userAnswer: '배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다',
  },
}

// OX - Answer States
export const OXShowAnswer: Story = {
  args: {
    quiz: oxQuiz,
    showAnswer: true,
  },
}

export const OXCorrectUserAnswer: Story = {
  args: {
    quiz: oxQuiz,
    showAnswer: true,
    userAnswer: 'O',
  },
}

export const OXWrongUserAnswer: Story = {
  args: {
    quiz: oxQuiz,
    showAnswer: true,
    userAnswer: 'X',
  },
}

// With Explanation
export const WithExplanation: Story = {
  args: {
    quiz: multipleQuiz,
    showExplanation: true,
  },
}
