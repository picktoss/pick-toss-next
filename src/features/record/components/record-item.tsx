import Text from '@/shared/components/ui/text'
import RecordQuizTypeIcon from './record-quiz-type-icon'
import Icon from '@/shared/components/custom/icon'

interface Props {
  type: Quiz.Set.Type
  name: string
  quizCount: number
  score: number
}

const RecordItem = ({ type, name, quizCount, score }: Props) => {
  return (
    <div className="flex w-full items-center gap-[16px] px-[8px] py-[16px]">
      <RecordQuizTypeIcon type={type} />

      <div className="flex flex-col">
        <Text typography="subtitle1-bold">{name}</Text>
        <div className="flex items-center gap-[8px]">
          <Text typography="text1-medium" color="sub">
            {quizCount}문제
          </Text>
          <Icon name="middle-dot" className="text-background-container-01" />
          <Text typography="text1-medium" color="sub">
            {score}/{quizCount}
          </Text>
        </div>
      </div>
    </div>
  )
}

export default RecordItem
