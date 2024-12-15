import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { msToElapsedTimeKorean } from '@/shared/utils/time'

interface Props {
  params: {
    id: string
  }
  searchParams: {
    type: Quiz.Set.Type
    name: string
    quizCount: number
    score: number
  }
}

const RecordDetailPage = ({ params, searchParams }: Props) => {
  const date = params.id.split('_')[0]
  const quizSetType = searchParams.type
  const quizSetName = searchParams.name
  const quizCount = searchParams.quizCount
  const correctRate = Math.round((searchParams.score / searchParams.quizCount) * 100)

  const ms = 135086 // 임시 데이터

  return (
    <main className="flex h-[calc(100dvh-54px)] flex-col overflow-y-auto">
      <div className="flex-center flex-col gap-[40px] px-[16px] pb-[33px] pt-[20px]">
        <div className="flex-center flex-col gap-[7px]">
          <Text typography="title2">{quizSetName}</Text>
          <Text typography="text2-medium" color="secondary">
            {date}
          </Text>
        </div>

        <div className="flex">
          <div className="flex-center flex-col px-[30px]">
            <Icon name="record-quiz-count" className="mb-[6px] size-[40px]" />
            <Text typography="text2-medium" color="sub" className="mb-[2px]">
              문제 수
            </Text>
            <Text typography="subtitle2-bold">{quizCount}문제</Text>
          </div>
          <div className="flex-center flex-col border-x border-border-divider px-[30px]">
            <Icon name="record-elapsed-time" className="mb-[6px] size-[40px]" />
            <Text typography="text2-medium" color="sub" className="mb-[2px]">
              소요시간
            </Text>
            <Text typography="subtitle2-bold">{msToElapsedTimeKorean(ms)}</Text>
          </div>
          <div className="flex-center flex-col px-[30px]">
            <Icon name="record-score" className="mb-[6px] size-[40px]" />
            <Text typography="text2-medium" color="sub" className="mb-[2px]">
              정답률
            </Text>
            <Text typography="subtitle2-bold">{correctRate}%</Text>
          </div>
        </div>
      </div>

      <div className="h-fit min-h-[calc(100dvh-292px)] bg-[var(--color-gray-50)] px-[16px] py-[20px]">
        {date}
        {quizSetType}
        {quizSetName}
        {quizCount}
        {correctRate}
      </div>
    </main>
  )
}

export default RecordDetailPage
