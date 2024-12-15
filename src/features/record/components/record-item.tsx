import Text from '@/shared/components/ui/text'
import RecordQuizTypeIcon from './record-quiz-type-icon'
import Icon from '@/shared/components/custom/icon'
import Link from 'next/link'

interface Props {
  type: Quiz.Set.Type
  name: string
  quizCount: number
  score: number
  date: string
  quizSetId: string
}

const RecordItem = ({ type, name, quizCount, score, date, quizSetId }: Props) => {
  return (
    <Link
      href={`/record/${date}_${quizSetId}?type=${type}&name=${name}&quizCount=${quizCount}&score=${score}`}
      className="flex w-full items-center gap-[16px] px-[8px] py-[16px]"
    >
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
    </Link>
  )
}

export default RecordItem
