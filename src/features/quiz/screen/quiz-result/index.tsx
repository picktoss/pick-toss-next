import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { msToElapsedTimeKorean } from '@/shared/utils/time'
import { QuizItem } from '@/types/quiz'
import QuizCard from '../../components/quiz-card'
import { Button } from '@/shared/components/ui/button'
import FixedBottom from '@/shared/components/custom/fixed-bottom'

interface Props {
  collectQuizCount: number
  quizzes: QuizItem[]
  totalElapsedTime: number
  showRecord: boolean
  setShowRecord: (value: boolean) => void
  quizResults: ({
    id: number
    answer: NonNullable<boolean | undefined>
    choseAnswer: string
    elapsedTime: number
  } | null)[]
  onClick: () => void
}

const QuizResult = ({
  collectQuizCount,
  quizzes,
  totalElapsedTime,
  showRecord,
  setShowRecord,
  quizResults,
  onClick,
}: Props) => {
  return (
    <div className="min-h-dvh bg-background-base-02 px-4 pb-[100px]">
      <div className="translate-y-[15vh] pb-[140px]">
        <div className="relative w-full rounded-[20px] bg-white">
          <Icon name="complete-quiz" className="absolute right-1/2 top-[-58px] translate-x-1/2" />
          <div className="pt-[98px] text-center">
            <Text typography="subtitle1-bold">퀴즈 완료!</Text>
            <Text typography="hero" className="mt-1">
              <span className="text-text-info">{collectQuizCount}</span>/{quizzes.length}
            </Text>
          </div>

          <div className="flex justify-between px-[40px] pb-[29px] pt-[48px]">
            <div className="flex flex-col items-center">
              <div className="flex-center size-10">
                <Icon name="speech-bubble-color" />
              </div>
              <Text typography="text2-medium" color="sub" className="mt-2">
                문제 수
              </Text>
              <Text typography="subtitle2-bold" className="mt-0.5">
                {quizzes.length} 문제
              </Text>
            </div>

            <div className="h-[90px] w-px self-center bg-[#EAECEF]" />

            <div className="flex flex-col items-center">
              <div className="flex-center size-10">
                <Icon name="timer-color" />
              </div>
              <Text typography="text2-medium" color="sub" className="mt-2">
                소요시간
              </Text>
              <Text typography="subtitle2-bold" className="mt-0.5">
                {msToElapsedTimeKorean(totalElapsedTime)}
              </Text>
            </div>

            <div className="h-[90px] w-px self-center bg-[#EAECEF]" />

            <div className="flex flex-col items-center">
              <div className="flex-center size-10">
                <Icon name="correct-check-round" />
              </div>
              <Text typography="text2-medium" color="sub" className="mt-2">
                정답률
              </Text>
              <Text typography="subtitle2-bold" className="mt-0.5">
                {Math.floor((collectQuizCount / quizzes.length) * 100)}%
              </Text>
            </div>
          </div>
        </div>

        {showRecord ? (
          <div className="mt-[49px]">
            <Text typography="title3">
              {quizzes.length}문제 중 <span className="text-text-info">{collectQuizCount}문제</span>{' '}
              맞았어요
            </Text>
            <div className="mt-5 flex flex-col gap-3">
              {quizzes.map((quiz, index) => (
                <QuizCard
                  key={quiz.id}
                  quiz={quiz}
                  header={
                    <div className="flex items-center justify-between">
                      <Text typography="text1-bold">
                        {quizResults[index]?.answer ? (
                          <span className="text-text-success">정답</span>
                        ) : (
                          <span className="text-text-critical">오답</span>
                        )}
                      </Text>
                      <Text typography="text2-medium" color="caption">
                        전공 공부 {'>'} 최근 이슈
                      </Text>
                    </div>
                  }
                  userAnswer={quizResults[index]?.choseAnswer}
                  answerMode={true}
                  showExplanation={true}
                />
              ))}
            </div>
          </div>
        ) : (
          <div>
            <Button
              variant="mediumSquare"
              colors="tertiary"
              className="mt-4 flex w-full items-center gap-2 text-button2"
              onClick={() => setShowRecord(true)}
            >
              <span>기록 보기</span>
              <Icon name="chevron-down" className="size-[16px] text-icon-tertiary" />
            </Button>
          </div>
        )}
      </div>

      <FixedBottom>
        <Button className="w-full" onClick={onClick}>
          확인
        </Button>
      </FixedBottom>
    </div>
  )
}

export default QuizResult
