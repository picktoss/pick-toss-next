import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'

const QuizSolvedToday = ({ quizCount }: { quizCount: number }) => {
  return (
    <div className="mt-[25px] flex px-[15px]">
      <Icon name="graph" className="mr-[12.6px] size-[70px]" fill="var(--color-orange-400)" />
      <div className="flex flex-col">
        <Text typography="text1-medium" color="secondary">
          오늘 푼 퀴즈
        </Text>
        <div className="flex items-end">
          <Text typography="hero" color="info" className="mr-[6px]">
            {quizCount}
          </Text>
          <Text typography="text2-medium" color="sub" className="mb-[5px] mr-[12px]">
            문제
          </Text>
          <Icon name="chevron-right" className="mb-[8px] text-icon-tertiary" />
        </div>
      </div>
    </div>
  )
}

export default QuizSolvedToday
