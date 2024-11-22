import { Meta, StoryObj } from '@storybook/react'
import { useEffect } from 'react'
import AnimatedButtons from '.'
import { DocumentProvider, useDocumentContext } from '../../contexts/document-context'

const AnimatedButtonsWithProvider = ({ isExpandedBtns }: { isExpandedBtns: boolean }) => {
  const { setIsExpandedBtns } = useDocumentContext()

  useEffect(() => {
    setIsExpandedBtns(isExpandedBtns)
  }, [isExpandedBtns, setIsExpandedBtns])

  return <AnimatedButtons />
}

const meta = {
  title: 'document/AnimatedButtons',
  component: AnimatedButtonsWithProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    nextjs: { appDirectory: true },
  },
  argTypes: {
    isExpandedBtns: {
      control: 'boolean',
      description: '버튼 확장 여부',
      defaultValue: false,
    },
  },
  decorators: [
    (Story, context) => (
      <DocumentProvider initialValues={{ isExpandedBtns: context.args.isExpandedBtns }}>
        <div className="relative mx-auto h-[500px] max-w-mobile p-4">
          <div className="absolute bottom-0 right-0">
            <Story {...context.args} />
          </div>
        </div>
      </DocumentProvider>
    ),
  ],
} satisfies Meta<typeof AnimatedButtonsWithProvider>

export default meta

type Story = StoryObj<typeof AnimatedButtonsWithProvider>

export const Default: Story = {
  args: {
    isExpandedBtns: false,
  },
}

export const Expanded: Story = {
  args: {
    isExpandedBtns: true,
  },
}
