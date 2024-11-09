import QuizTimer from '@/features/quiz/components/quiz-timer'
import GoBackButton from '@/shared/components/custom/go-back-button'
import Icon from '@/shared/components/custom/icon'

interface QuizHeaderProps {
  isRunning: boolean
  totalElapsedTime: number
}

const QuizHeader = ({ isRunning, totalElapsedTime }: QuizHeaderProps) => (
  <header className="relative flex h-[54px] items-center justify-between px-[16px]">
    <GoBackButton icon="cancel" onClick={() => {}} />
    <div className="absolute right-1/2 translate-x-1/2">
      <QuizTimer isRunning={isRunning} totalElapsedTime={totalElapsedTime} />
    </div>
    <Icon name="adjust-controls" className="size-[24px]" />
  </header>
)

export default QuizHeader
