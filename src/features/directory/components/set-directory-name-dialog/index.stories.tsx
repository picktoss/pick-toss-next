import type { Meta, StoryObj } from '@storybook/react'
import SetDirectoryNameDialog from '.'
import Text from '@/shared/components/ui/text'
import Icon from '@/shared/components/custom/icon'

const meta = {
  title: 'document/SetDirectoryNameDialog',
  component: SetDirectoryNameDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: '다이얼로그 제목' },
    confirmText: { control: 'text', description: '다이얼로그의 확인 버튼에 들어갈 텍스트' },
    prev: {
      control: 'object',
      defaultValue: { name: '기존 폴더명', emoji: '📁' },
      description: '폴더 이름 변경일 경우 기존 정보',
    },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-mobile">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SetDirectoryNameDialog>

export default meta
type Story = StoryObj<typeof SetDirectoryNameDialog>

// 폴더 생성
export const Create: Story = {
  render: (args) => (
    <SetDirectoryNameDialog
      {...args}
      triggerComponent={
        <button className="my-[7px] flex items-center px-[20px] py-[10px]">
          <Icon name="plus-circle" className="mr-[16px]" />
          폴더 추가
        </button>
      }
      title={'폴더 만들기'}
      onConfirm={() => {}}
      confirmText={'만들기'}
    />
  ),
}

// 폴더 이름 수정
export const Modify: Story = {
  render: (args) => (
    <SetDirectoryNameDialog
      {...args}
      triggerComponent={
        <button className="w-[240px] cursor-pointer border-t border-border-divider px-[20px] py-[16px]">
          <Text typography="subtitle2-medium" className="flex w-full items-center justify-between">
            폴더 이름 바꾸기
            <Icon name="write-line" className="size-[20px]" />
          </Text>
        </button>
      }
      title={'폴더 이름 바꾸기'}
      onConfirm={() => {}}
      confirmText={'저장'}
      prev={{ name: '전공 공부', emoji: '📊' }}
    />
  ),
}
