import QuizSettingDialog from '@/features/quiz/components/quiz-setting-dialog'
import QuizTimer from '@/features/quiz/components/quiz-timer'
import GoBackButton from '@/shared/components/custom/go-back-button'

interface QuizHeaderProps {
  hideTimer: boolean
  isRunning: boolean
  totalElapsedTime: number
  runTimer: () => void
  stopTimer: () => void
  handleClickExit: () => void
}

const QuizHeader = ({
  hideTimer,
  isRunning,
  totalElapsedTime,
  runTimer,
  stopTimer,
  handleClickExit,
}: QuizHeaderProps) => (
  <header className="relative flex h-[54px] items-center justify-between px-[16px]">
    <GoBackButton icon="cancel" onClick={() => handleClickExit()} />

    {!hideTimer && (
      <div className="absolute right-1/2 translate-x-1/2">
        <QuizTimer isRunning={isRunning} totalElapsedTime={totalElapsedTime} />
      </div>
    )}

    <QuizSettingDialog
      runTimer={runTimer}
      stopTimer={stopTimer}
      handleActiveExplanation={() => {}}
      handleActiveTimer={() => {}}
    />
  </header>
)

export default QuizHeader
