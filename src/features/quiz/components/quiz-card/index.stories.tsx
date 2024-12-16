import type { Meta, StoryObj } from '@storybook/react'
import QuizCard from '.'
import Text from '@/shared/components/ui/text'
import Tag from '@/shared/components/ui/tag'
import QuizCardMenu from '../quiz-card-menu'

const meta = {
  title: 'quiz/QuizCard',
  component: QuizCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof QuizCard>

export default meta
type Story = StoryObj<typeof meta>

const multipleQuiz: Quiz.Item = {
  id: 1,
  quizType: 'MULTIPLE_CHOICE',
  question: '식물기반 단백질 시장에서 대기업의 참여가 늘어나는 이유는 무엇인가요?',
  options: [
    '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다',
    '배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다',
    '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이',
    '기존의 배양육이 기존방식에서 육류보다 토양이 비축된다',
  ],
  answer: '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다',
  explanation: '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다',
  document: {
    id: 1,
    name: '최근 이슈',
  },
  directory: {
    id: 1,
    name: '전공 공부',
  },
}

const oxQuiz: Quiz.Item = {
  id: 2,
  quizType: 'MIX_UP',
  question: '식물기반 단백질 시장에서 대기업의 참여가 늘어나는 이유는 무엇인가요?',
  answer: 'correct',
  explanation: '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다',
} as Quiz.Item

const Template: Story = {
  args: {
    quiz: multipleQuiz,
    header: (
      <Text typography="title3" className="text-text-accent">
        Q.
      </Text>
    ),
  },
  render: (args) => <QuizCard {...args} />,
}

// Default states
export const DefaultMultiple: Story = { ...Template }

export const DefaultOX: Story = {
  ...Template,
  args: {
    ...Template.args,
    quiz: oxQuiz,
  },
}

// With tag and menu
export const WithTagMenu: Story = {
  ...Template,
  args: {
    ...Template.args,
    header: (
      <div className="flex items-center justify-between text-icon-tertiary">
        <Tag colors="tertiary">오답</Tag>
        <QuizCardMenu quizId={0} />
      </div>
    ),
  },
}

// With tag and menu
export const WithBreadcrumb: Story = {
  args: {
    ...Template.args,
    header: (
      <div className="flex items-center justify-between text-icon-tertiary">
        <Text typography="title3" className="text-text-accent">
          Q.
        </Text>
        <Text typography="text2-medium" color="caption">
          전공 공부 {'>'} 최근이슈
        </Text>
      </div>
    ),
  },
}

// Multiple Choice - Answer States
export const MultipleShowAnswer: Story = {
  args: {
    ...Template.args,
    answerMode: true,
  },
}

export const MultipleCorrectUserAnswer: Story = {
  args: {
    ...Template.args,
    answerMode: true,
    userAnswer: '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다',
  },
}

export const MultipleWrongUserAnswer: Story = {
  args: {
    ...Template.args,
    answerMode: true,
    userAnswer: '배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다',
  },
}

export const OXCorrectUserAnswer: Story = {
  args: {
    ...Template.args,
    quiz: oxQuiz,
    answerMode: true,
    userAnswer: 'correct',
  },
}

export const OXWrongUserAnswer: Story = {
  args: {
    ...Template.args,
    quiz: oxQuiz,
    answerMode: true,
    userAnswer: 'incorrect',
  },
}

// With Explanation
export const WithExplanation: Story = {
  args: {
    ...Template.args,
    quiz: multipleQuiz,
    showExplanation: true,
  },
}
