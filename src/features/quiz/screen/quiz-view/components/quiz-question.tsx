import { motion } from 'framer-motion'
import Text from '@/shared/components/ui/text'
import { QUIZ_ANIMATION_DURATION } from '@/features/quiz/config'

interface QuizQuestionProps {
  index: number
  question: string
}

const QuizQuestion = ({ index, question }: QuizQuestionProps) => (
  <motion.div
    className="mt-[45px]"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: QUIZ_ANIMATION_DURATION }}
    key={index}
  >
    <Text typography="title3" className="text-text-accent">
      Q{index + 1}.
    </Text>
    <Text typography="question" className="mt-[8px]">
      {question}
    </Text>
  </motion.div>
)

export default QuizQuestion
