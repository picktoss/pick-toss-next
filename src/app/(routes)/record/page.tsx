import CustomCalendar from '@/features/record/calendar'
import RecordItem from '@/features/record/components/record-item'
import { getQuizRecords } from '@/requests/quiz/server'
import Icon from '@/shared/components/custom/icon'
import { Button } from '@/shared/components/ui/button'
import Text from '@/shared/components/ui/text'
import { formatDateKorean, getFormattedDate } from '@/shared/utils/date'
import Link from 'next/link'

interface Props {
  searchParams: {
    selectedDate: string
  }
}

const RecordPage = async ({ searchParams }: Props) => {
  const today = new Date()
  const selectedDate = searchParams.selectedDate ?? getFormattedDate(today)
  const { currentConsecutiveDays, maxConsecutiveDays, quizRecords } = await getQuizRecords()

  // 데이터가 많아지면 클라이언트 컴포넌트로 분리해서 로딩 처리가 필요할 수도 있음
  const dateRecords = quizRecords.filter(
    (quizInfo) => quizInfo.solvedDate.split('T')[0] === selectedDate
  )

  return (
    <main className="h-[calc(100dvh-54px)] overflow-y-auto px-[16px]">
      <div className="flex-center flex-col gap-[8px] border-b border-border-divider pb-[20px] pt-[10px]">
        <Text typography="title3">
          <Text as={'span'} color="accent">
            {currentConsecutiveDays}
          </Text>
          일 연속으로 푸는 중
        </Text>

        <Text typography="text1-medium" color="caption">
          최장 연속일: {maxConsecutiveDays}일
        </Text>
      </div>

      <CustomCalendar className="mt-[3px]" userQuizRecords={quizRecords} />

      <div className="flex flex-col">
        <Text typography="text2-medium" color="sub" className="my-[8px]">
          {formatDateKorean(selectedDate, { month: true, day: true })}
        </Text>
        {dateRecords.map((record, index) => (
          <RecordItem
            key={record.quizSetId + '-' + index}
            type={record.quizSetType}
            name={record.name}
            quizCount={record.quizCount}
            score={record.score}
            date={record.solvedDate.split('T')[0] ?? ''}
            quizSetId={record.quizSetId}
          />
        ))}
      </div>

      <Link href={'/record/all' + `?selectedDate=${selectedDate}`} className="size-fit">
        <Button
          variant={'smallSquare'}
          colors={'tertiary'}
          className="mb-[27px] mt-[8px] h-fit w-full py-[13.5px]"
        >
          기록 전체보기
          <Icon name="chevron-right" className="size-[16px] text-icon-tertiary" />
        </Button>
      </Link>
    </main>
  )
}

export default RecordPage
