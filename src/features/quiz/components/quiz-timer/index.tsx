import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { useTimer } from '@/shared/hooks/use-timer'
import { cn } from '@/shared/lib/utils'
import { msToElapsedTime } from '@/shared/utils/time'
import { useEffect } from 'react'

interface QuizTimerProps {
  isRunning: boolean
}

const QuizTimer = ({ isRunning }: QuizTimerProps) => {
  const { totalElapsedTime, runTimer, stopTimer } = useTimer()

  useEffect(() => {
    if (isRunning) {
      runTimer()
    } else {
      stopTimer()
    }
  }, [isRunning])

  return (
    <div
      className={cn(
        'rounded-[12px] px-[12px] py-[4px] min-w-[110px] bg-background-base-02 flex items-center gap-[8px]',
        isRunning && 'bg-background-container-02'
      )}
    >
      <Icon name="timer" className={cn('text-icon-disabled', isRunning && 'text-icon-primary')} />
      <Text typography="text1-medium" color={isRunning ? 'accent' : 'disabled'}>
        {msToElapsedTime(totalElapsedTime)}
      </Text>
    </div>
  )
}

export default QuizTimer
