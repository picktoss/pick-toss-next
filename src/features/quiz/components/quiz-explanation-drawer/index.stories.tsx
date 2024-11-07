import type { Meta, StoryObj } from '@storybook/react'
import QuizExplanationDrawer from '.'

const meta = {
  title: 'Quiz/QuizExplanationDrawer',
  component: QuizExplanationDrawer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isCorrect: {
      control: 'boolean',
      description: '정답 여부',
      defaultValue: true,
    },
    explanation: {
      control: 'text',
      description: '설명 텍스트',
    },
    correctAnswer: {
      control: 'text',
      description: '정답 텍스트 (오답일 경우 표시)',
      if: { arg: 'isCorrect', eq: false },
    },
  },
  decorators: [
    (Story) => (
      <div className="relative h-screen w-screen translate-x-1/2">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof QuizExplanationDrawer>

export default meta

type Story = StoryObj<typeof meta>

const SAMPLE_EXPLANATION = `윌리엄 홀만 교수가 제시한 신식품 명명법의 주요 기준은 다섯 가지로, 소비자가 세포 기반
제품을 기존 제품과 구별할 수 있어야 하며, 전통적인 생선, 조개류, 소고기 또는 가금류에
알레르기가 있는 사람들이 세포 기반 제품을 잠재적 알레르겐으로 식별할 수 있도록 해야
합니다. 또한, 세포 기반 제품이나 기존 제품을 비하하지 않는 이름이어야 하며, 제품이
안전하고 건강하며 영양가 있다는 사실과 일치하지 않는 생각, 이미지 또는 감정을
불러일으키지 않는 중립적인 이름이어야 합니다. 마지막으로, 소비자가 제품을 식별할 수
있는 적절한 용어로 인식해야 한다고 합니다.`

export const Correct: Story = {
  args: {
    isCorrect: true,
    explanation: SAMPLE_EXPLANATION,
  },
}

export const Wrong: Story = {
  args: {
    isCorrect: false,
    explanation: SAMPLE_EXPLANATION,
    correctAnswer: 'A',
  },
}
