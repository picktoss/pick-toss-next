import Text from '@/shared/components/ui/text'
import QuizOptions from '../../screen/quiz-view/components/quiz-option'
import { useQuizState } from '../../screen/quiz-view/hooks/use-quiz-state'
import Tag from '@/shared/components/ui/tag'
import Image from 'next/image'

interface Props {
  quizzes: Quiz.Item[]
  currentIndex: number
  onAnswer: ({
    id,
    isRight,
    choseAnswer,
  }: {
    id: number
    isRight: boolean
    choseAnswer: string
  }) => void
  quizResults: ReturnType<typeof useQuizState>['quizResults']
  leftQuizCount: number
}

const BombQuiz = ({ quizzes, currentIndex, onAnswer, quizResults, leftQuizCount }: Props) => {
  const currentQuiz = quizzes[currentIndex] as Quiz.Item
  const currentResult = quizResults[currentIndex] ?? null

  if (currentQuiz) {
    return (
      <>
        <div className="flex flex-col items-center">
          <Tag colors={'tertiary'} className="px-[8px] py-[4px]">
            <Text typography="text2-bold" color="sub" className="max-w-[95px] truncate">
              {currentQuiz.document.name}
            </Text>
          </Tag>

          <Text
            key={currentIndex}
            typography="question"
            className="mt-[12px] animate-fadeIn px-[30px] text-center"
          >
            {currentQuiz.question}
          </Text>

          <QuizOptions
            quiz={currentQuiz}
            currentResult={currentResult}
            onAnswer={onAnswer}
            className="my-[16px] mt-[4dvh] w-full"
          />
        </div>

        <div className="relative mb-[11px]">
          <Text typography="subtitle1-bold" color="primary-inverse" className="center">
            {leftQuizCount}
          </Text>
          <Image src={'/images/count-device.png'} alt="" width={79} height={38} />
        </div>
      </>
    )
  }

  return null
}

export default BombQuiz
