import Text from '@/shared/components/ui/text'
import QuizOptions from '../../screen/quiz-view/components/quiz-option'
import { useQuizState } from '../../screen/quiz-view/hooks/use-quiz-state'
import Tag from '@/shared/components/ui/tag'
import GoBackButton from '@/shared/components/custom/go-back-button'
import Image from 'next/image'

interface Props {
  quizzes: Quiz.ItemWithMetadata[]
  currentIndex: number
  quizResults: ReturnType<typeof useQuizState>['quizResults']
  setQuizResults: ReturnType<typeof useQuizState>['setQuizResults']
  leftQuizCount: number
}

const BombQuiz = ({ quizzes, currentIndex, quizResults, setQuizResults, leftQuizCount }: Props) => {
  const currentQuiz = quizzes[currentIndex]
  const currentResult = quizResults[currentIndex]

  const onAnswer = ({
    id,
    isRight,
    choseAnswer,
  }: {
    id: number
    isRight: boolean
    choseAnswer: string
  }) => {
    setQuizResults((prev) => {
      const newResults = [...prev]
      newResults[currentIndex] = {
        id,
        answer: isRight,
        choseAnswer,
        elapsedTime: 1, // 임시
      }
      return newResults
    })
  }

  return (
    <div className="flex h-[70dvh] min-h-fit w-full flex-col items-center justify-between">
      <header className="h-[54px] w-full py-[16px]">
        <GoBackButton
          icon="cancel"
          onClick={() => {
            // TODO:
            // 현재까지 퀴즈 결과 서버에 전송
            // onSuccess: 메인 화면으로 이동
          }}
        />
      </header>

      <div className="flex flex-col items-center">
        <Tag colors={'secondary'} className="px-[8px] py-[4px]">
          <Text typography="text2-bold">{currentQuiz.document.name as string}</Text>
        </Tag>

        <Text typography="question" className="mt-[12px] animate-fadeIn px-[30px] text-center">
          {currentQuiz.question}
        </Text>

        <QuizOptions
          quiz={currentQuiz}
          currentResult={currentResult}
          onAnswer={onAnswer}
          className="my-[16px] mt-[4dvh]"
        />
      </div>

      <div className="relative mb-[11px]">
        <Text typography="subtitle1-bold" color="primary-inverse" className="center">
          {leftQuizCount}
        </Text>
        <Image src={'/images/count-device.png'} alt="" width={79} height={38} />
      </div>
    </div>
  )
}

export default BombQuiz
