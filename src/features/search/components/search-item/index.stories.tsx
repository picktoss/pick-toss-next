import type { Meta, StoryObj } from '@storybook/react'
import SearchItem from '.'

const meta: Meta<typeof SearchItem> = {
  title: 'search/SearchItem',
  component: SearchItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-mobile">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    createType: {
      control: 'radio',
      options: ['FILE', 'TEXT', 'NOTION'],
      description: '노트의 타입, 직접 작성 / 파일 첨부 / 노션 연동을 의미',
    },
    documentTitle: { control: 'text', description: '노트의 제목' },
    matchingSentence: { control: 'text', description: '검색 키워드가 포함된 문장' },
    resultType: {
      control: 'radio',
      options: ['document', 'quiz'],
      description: '검색 결과 타입, 노트에서 나온 결과인지 퀴즈에서 나온 결과인지를 의미',
    },
    relativeDirectory: { control: 'text', description: '검색결과와 연관된 노트가 소속된 폴더' },
    lastItem: { control: 'boolean', description: '검색결과가 마지막 요소인지 여부' },
  },
}

export default meta
type Story = StoryObj<typeof SearchItem>

export const Default: Story = {
  args: {
    createType: 'TEXT',
    documentTitle: '제무제표 분석하기',
    matchingSentence:
      '...제품을 기존 제품과 구별할 수 있어야 하며, 전통적인 기초 육류, 조개류, 소고기 또는 가금류에 알레르기가 있는 사람들이 세포 기반 제품...',
    resultType: 'document',
    relativeDirectory: '전공 공부',
    lastItem: false,
  },
}
