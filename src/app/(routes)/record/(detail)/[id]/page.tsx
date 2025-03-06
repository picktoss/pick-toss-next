import QuizCard from '@/features/quiz/components/quiz-card'
import { getQuizDetailRecord } from '@/requests/quiz/server'
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

const RecordDetailPage = async ({ params, searchParams }: Props) => {
  const date = params.id.split('_')[0]
  const quizSetId = params.id
    .split('_')
    .filter((value) => value !== date)
    .join('_')
  const quizSetType = searchParams.type
  const quizSetName = searchParams.name
  const quizCount = searchParams.quizCount
  const correctRate = Math.round((searchParams.score / searchParams.quizCount) * 100)

  const { totalElapsedTimeMs, quizzes } = await getQuizDetailRecord({ quizSetId, quizSetType })

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
            <div className="flex-center mb-[6px] size-[40px]">
              <Icon name="speech-bubble-color" className="w-[36px]" />
            </div>
            <Text typography="text2-medium" color="sub" className="mb-[2px]">
              문제 수
            </Text>
            <Text typography="subtitle2-bold">{quizCount}문제</Text>
          </div>
          <div className="flex-center flex-col border-x border-border-divider px-[30px]">
            <div className="flex-center mb-[6px] size-[40px]">
              <Icon name="timer-color" className="w-[30px]" />
            </div>
            <Text typography="text2-medium" color="sub" className="mb-[2px]">
              소요시간
            </Text>
            <Text typography="subtitle2-bold">
              {msToElapsedTimeKorean(totalElapsedTimeMs) || '-'}
            </Text>
          </div>
          <div className="flex-center flex-col px-[30px]">
            <div className="flex-center mb-[6px] size-[40px]">
              <Icon name="correct-check-round" className="size-[34px]" />
            </div>
            <Text typography="text2-medium" color="sub" className="mb-[2px]">
              정답률
            </Text>
            <Text typography="subtitle2-bold">{correctRate}%</Text>
          </div>
        </div>
      </div>

      <div className="flex-center h-fit flex-col gap-[12px] bg-[var(--color-gray-50)] px-[16px] py-[20px]">
        {quizzes.map((quiz, index) => (
          <QuizCard
            key={quiz.id + '-idx:' + index}
            answerMode
            userAnswer={quiz.choseAnswer}
            header={
              <div className="flex items-center justify-between pr-[6px] text-icon-tertiary">
                {quiz.answer === quiz.choseAnswer ? (
                  <Text typography="text1-bold" color="right">
                    정답
                  </Text>
                ) : (
                  <Text typography="text1-bold" color="critical">
                    오답
                  </Text>
                )}

                {quiz.quizSetType === 'COLLECTION_QUIZ_SET' ? (
                  <Text typography="text2-medium" color="caption">
                    {quiz.collectionName}
                  </Text>
                ) : (
                  <Text typography="text2-medium" color="caption">
                    {quiz.directoryName}
                    {'>'}
                    {quiz.documentName}
                  </Text>
                )}
              </div>
            }
            quiz={quiz}
          />
        ))}
      </div>
    </main>
  )
}

export default RecordDetailPage
