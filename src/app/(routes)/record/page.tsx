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

  // 데이터가 많아지면 다른 방법으로 처리해보는 것을 고민
  // 백엔드 측에 특정 solvedDate를 api 요청 시 보내면 일치하는 데이터를 보내주는 방법 제안해봐도 좋을 듯
  const dateRecord = quizRecords.find((quizInfo) => quizInfo.solvedDate === selectedDate)

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

      <CustomCalendar className="mt-[3px]" />

      <div className="flex flex-col">
        <Text typography="text2-medium" color="sub" className="my-[8px]">
          {formatDateKorean(selectedDate, { month: true, day: true })}
        </Text>
        {dateRecord?.quizRecords.map((record, index) => (
          <RecordItem
            key={record.quizSetId + '-' + index}
            type={record.quizSetType}
            name={record.name}
            quizCount={record.quizCount}
            score={record.score}
            date={dateRecord.solvedDate}
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
