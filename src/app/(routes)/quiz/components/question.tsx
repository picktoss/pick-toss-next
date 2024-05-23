import { HTMLAttributes } from 'react'

interface QuestionProps {
  categoryName: string
  documentName: string
  question: string
  className?: HTMLAttributes<HTMLDivElement>['className']
}

export default function Question({
  categoryName,
  documentName,
  question,
  className,
}: QuestionProps) {
  return (
    <div className={className}>
      <div className="px-[20px]">
        <div className="w-full overflow-hidden rounded-[12px]">
          {/**
           * TODO: Progress Bar
           */}
          <div className="relative h-[8px] *:h-[8px]">
            <div className="bg-gray-02" />
            <div className="absolute left-0 top-0 w-1/4 bg-orange-04" />
          </div>
          <div className="flex flex-col gap-[8px] bg-white px-[20px] pb-[40px] pt-[32px]">
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
    </div>
  )
}
