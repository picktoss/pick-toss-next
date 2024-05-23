import { HTMLAttributes } from 'react'
import ProgressBar from './progress-bar'

interface QuestionProps {
  categoryName: string
  documentName: string
  question: string
  curQuizIndex: number
  totalQuizCount: number
  className?: HTMLAttributes<HTMLDivElement>['className']
}

export default function Question({
  categoryName,
  documentName,
  question,
  curQuizIndex,
  totalQuizCount,
  className,
}: QuestionProps) {
  return (
    <div className={className}>
      <div className="w-full px-[20px]">
        <ProgressBar curQuizIndex={curQuizIndex} totalQuizCount={totalQuizCount} />
        <div className="flex flex-col gap-[8px] rounded-b-[12px] bg-white px-[20px] pb-[40px] pt-[32px]">
          <div className="text-small1-regular text-gray-07">
            {categoryName} {'>'} {documentName}
          </div>
          <div className="flex items-start gap-[8px]">
            <div className="text-h3-bold text-orange-06">Q</div>
            <div className="text-h4-bold text-gray-09">{question}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
