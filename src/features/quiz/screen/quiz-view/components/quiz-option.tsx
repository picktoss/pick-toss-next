import { motion } from 'framer-motion'
import MultipleOption from '@/features/quiz/components/multiple-option'
import OXChoice from '@/features/quiz/components/ox-choice'
import { getOXCondition, getOptionCondition } from '@/features/quiz/utils'
import { QUIZ_ANIMATION_DURATION } from '@/features/quiz/config'
import { cn } from '@/shared/lib/utils'

interface QuizOptionsProps {
  quiz: Quiz.Item | Quiz.RandomItem
  currentResult: Quiz.Result | null
  onAnswer: (params: { id: number; isRight: boolean; choseAnswer: string }) => void
  className?: HTMLElement['className']
}

const QuizOptions = ({ quiz, currentResult, onAnswer, className }: QuizOptionsProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { x: -20, opacity: 0 },
    show: { x: 0, opacity: 1 },
  }

  if (quiz.quizType === 'MULTIPLE_CHOICE') {
    return (
      <motion.div
        className={cn('flex flex-col gap-[12px] w-full', className)}
        variants={container}
        initial="hidden"
        animate="show"
        key={quiz.id}
      >
        {quiz.options?.map((option, index) => (
          <motion.div
            key={option}
            variants={item}
            transition={{ duration: QUIZ_ANIMATION_DURATION / 4 }}
          >
            <MultipleOption
              index={index}
              condition={getOptionCondition(option, currentResult, quiz.answer)}
              option={option}
              onClick={() => {
                onAnswer({
                  id: quiz.id,
                  isRight: quiz.answer === option ? true : false,
                  choseAnswer: option,
                })
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    )
  }

  if (quiz.quizType === 'MIX_UP') {
    return (
      <motion.div
        className="mt-[74px]"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: QUIZ_ANIMATION_DURATION }}
        key={quiz.id}
      >
        <OXChoice
          condition={getOXCondition(currentResult)}
          userAnswer={currentResult?.choseAnswer as Quiz.OXAnswer}
          onSelect={(userAnswer: Quiz.OXAnswer) => {
            onAnswer({
              id: quiz.id,
              isRight: quiz.answer === userAnswer ? true : false,
              choseAnswer: userAnswer,
            })
          }}
        />
      </motion.div>
    )
  }

  return null
}

export default QuizOptions
