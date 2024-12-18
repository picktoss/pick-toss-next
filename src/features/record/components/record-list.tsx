import Text from '@/shared/components/ui/text'
import { formatDateKorean } from '@/shared/utils/date'
import RecordItem from './record-item'

interface Props {
  selectedDate: string
  quizRecords: Quiz.Record[]
}

const RecordList = ({ selectedDate, quizRecords }: Props) => {
  return (
    <div className="flex flex-col">
      <Text typography="text2-medium" color="sub" className="my-[8px]">
        {formatDateKorean(selectedDate, { month: true, day: true })}
      </Text>

      {quizRecords.map((record, index) => (
        <RecordItem
          key={record.quizSetId + '-' + index}
          type={record.quizSetType}
          name={record.name}
          quizCount={record.quizCount}
          score={record.score}
          date={selectedDate}
          quizSetId={record.quizSetId}
        />
      ))}
    </div>
  )
}

export default RecordList
