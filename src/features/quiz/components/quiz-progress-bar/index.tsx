import { Progress } from '@/shared/components/ui/progress'
import Text from '@/shared/components/ui/text'

interface QuizProgressBarProps {
  totalQuizCount: number
  currentIndex: number
}

const QuizProgressBar = ({ totalQuizCount, currentIndex }: QuizProgressBarProps) => {
  const currentQuizCount = currentIndex + 1
  const value = (currentQuizCount / totalQuizCount) * 100

  return (
    <div className="relative h-[30px]">
      <Progress value={value} className="h-[8px] w-full rounded-[8px]" />
      <div
        className="absolute bottom-0 w-full"
        style={{
          transform: `translateX(${value}%)`,
        }}
      >
        <Text typography="text2-medium" className="w-fit -translate-x-1/2 text-text-caption">
          {currentQuizCount}/{totalQuizCount}
        </Text>
      </div>
    </div>
  )
}

export default QuizProgressBar
