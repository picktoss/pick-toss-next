import CustomCalendar from '@/features/record/components/calendar'
import ConsecutiveDays from '@/features/record/components/consecutive-days'
import RecordList from '@/features/record/components/record-list'
import { getQuizRecordsByDate } from '@/requests/quiz/server'
import Icon from '@/shared/components/custom/icon'
import { Button } from '@/shared/components/ui/button'
import { getFormattedDate } from '@/shared/utils/date'
import Link from 'next/link'

interface Props {
  searchParams: {
    selectedDate: string
  }
}

const RecordPage = async ({ searchParams }: Props) => {
  const today = new Date()
  const selectedDate = searchParams.selectedDate ?? getFormattedDate(today)
  const { currentConsecutiveDays, maxConsecutiveDays, quizRecords } = await getQuizRecordsByDate(
    selectedDate
  )

  return (
    <main className="h-[calc(100dvh-54px)] overflow-y-auto px-[16px]">
      <ConsecutiveDays
        currentConsecutiveDays={currentConsecutiveDays}
        maxConsecutiveDays={maxConsecutiveDays}
      />

      <CustomCalendar className="mt-[3px]" />

      <RecordList selectedDate={selectedDate} quizRecords={quizRecords} />

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
