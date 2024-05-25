import ProgressBar from './progress-bar'
import { motion } from 'framer-motion'

interface QuestionProps {
  categoryName: string
  documentName: string
  question: string
  curQuizIndex: number
  totalQuizCount: number
}

export default function Question({
  categoryName,
  documentName,
  question,
  curQuizIndex,
  totalQuizCount,
}: QuestionProps) {
  return (
    <div key={curQuizIndex} className="w-full px-[20px]">
      <ProgressBar curQuizIndex={curQuizIndex} totalQuizCount={totalQuizCount} />
      <div className="rounded-b-[12px] bg-white px-[20px] pb-[40px] pt-[32px]">
        <motion.div
          className="flex flex-col gap-[8px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-small1-regular text-gray-07">
            {categoryName} {'>'} {documentName}
          </div>
          <div className="flex items-start gap-[8px]">
            <div className="text-h3-bold text-orange-06">Q</div>
            <div className="text-h4-bold text-gray-09">{question}</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
