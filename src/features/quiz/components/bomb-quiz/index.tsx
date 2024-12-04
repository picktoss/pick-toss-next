import Text from '@/shared/components/ui/text'
import QuizOptions from '../../screen/quiz-view/components/quiz-option'
import { useQuizState } from '../../screen/quiz-view/hooks/use-quiz-state'
import Tag from '@/shared/components/ui/tag'
import GoBackButton from '@/shared/components/custom/go-back-button'
import Image from 'next/image'

interface Props {
  quizzes: Quiz.ItemWithMetadata[]
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
  handleExit: () => void
}

const BombQuiz = ({
  quizzes,
  currentIndex,
  onAnswer,
  quizResults,
  leftQuizCount,
  handleExit,
}: Props) => {
  const currentQuiz = quizzes[currentIndex]
  const currentResult = quizResults[currentIndex]

  return (
    <div className="flex h-[70dvh] min-h-fit w-full flex-col items-center justify-between">
      <header className="h-[54px] w-full py-[16px]">
        <GoBackButton icon="cancel" onClick={handleExit} />
      </header>

      <div className="flex flex-col items-center">
        <Tag colors={'secondary'} className="px-[8px] py-[4px]">
          <Text typography="text2-bold">{currentQuiz.document.name}</Text>
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
