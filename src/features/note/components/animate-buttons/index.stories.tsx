import { Meta, StoryObj } from '@storybook/react'
import { useEffect } from 'react'
import { QuizNoteProvider, useQuizNoteContext } from '../../contexts/quiz-note-context'
import AnimatedButtons from '.'

const AnimatedButtonsWithProvider = ({ isExpandedBtns }: { isExpandedBtns: boolean }) => {
  const { setIsExpandedBtns } = useQuizNoteContext()

  useEffect(() => {
    setIsExpandedBtns(isExpandedBtns)
  }, [isExpandedBtns, setIsExpandedBtns])

  return <AnimatedButtons />
}

const meta: Meta<typeof AnimatedButtonsWithProvider> = {
  title: 'note/AnimatedButtons',
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
      <QuizNoteProvider initialValues={{ isExpandedBtns: context.args.isExpandedBtns }}>
        <div className="relative mx-auto h-[500px] max-w-mobile p-4">
          <div className="absolute bottom-0 right-0">
            <Story {...context.args} />
          </div>
        </div>
      </QuizNoteProvider>
    ),
  ],
}

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
