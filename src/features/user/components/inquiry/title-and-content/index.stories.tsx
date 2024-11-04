import { Meta, StoryObj } from '@storybook/react'
import TitleAndContent from '.'
import { useEffect } from 'react'
import { InquiryProvider, useInquiry } from '../../../contexts/inquiry-context'

const meta: Meta<typeof TitleAndContent> = {
  title: 'inquiry/TitleAndContent',
  component: TitleAndContent,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-mobile">
        <InquiryProvider>
          <Story />
        </InquiryProvider>
      </div>
    ),
  ],
  argTypes: {
    title: {
      control: 'text',
      description: '문의 제목',
      defaultValue: '',
    },
    content: {
      control: 'text',
      description: '문의 내용',
      defaultValue: '',
    },
  },
}

export default meta

type Story = StoryObj<typeof TitleAndContentWithArgs>

export const Default: Story = {
  args: {
    title: '',
    content: '',
  },
  render: (args) => <TitleAndContentWithArgs {...args} />,
}

const TitleAndContentWithArgs = ({ title, content }: { title: string; content: string }) => {
  const { setTitle, setContent } = useInquiry()

  useEffect(() => {
    setTitle(title)
    setContent(content)
  }, [title, content, setTitle, setContent])

  return <TitleAndContent />
}
