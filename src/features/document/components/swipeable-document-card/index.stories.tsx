import type { Meta, StoryObj } from '@storybook/react'
import SwipeableDocumentCard from '.'
import { DirectoryProvider } from '../../contexts/directory-context'

const meta: Meta<typeof SwipeableDocumentCard> = {
  title: 'document/SwipeableDocumentCard',
  component: SwipeableDocumentCard,
  tags: ['autodocs'],
  parameters: {
    nextjs: { appDirectory: true },
    layout: 'centered',
  },
  argTypes: {
    createType: {
      control: 'radio',
      options: ['write', 'file', 'notion'],
      description: '노트의 타입, 직접 작성 / 파일 첨부 / 노션 연동을 의미',
    },
    title: { control: 'text', description: '노트의 제목' },
    content: { control: 'text', description: '노트의 내용, 첫째 줄' },
    quizCount: { control: 'number', description: '노트에서 생성된 퀴즈의 수' },
    characterCount: { control: 'number', description: '노트의 글자 수' },
    directory: { control: 'text', description: '노트가 소속된 폴더' },
    reviewCount: { control: 'number', description: '노트에서 복습 픽으로 선정된 문제 수' },
  },
  decorators: [
    (Story) => (
      <DirectoryProvider>
        <Story />
      </DirectoryProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SwipeableDocumentCard>

export const Default: Story = {
  args: {
    id: 1,
    createType: 'WRITE',
    title: '최근 이슈',
    content: '미리보기 문장 이러이러합니다 한줄이내로 작성해주세요.',
    quizCount: 28,
    characterCount: 6382,
    directory: '전공 공부',
    reviewCount: 2,
  },
}
