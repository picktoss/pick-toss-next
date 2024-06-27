import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

export function PickAccordion({
  keyPoints,
  mutateToggleBookmark,
}: {
  keyPoints: {
    id: number
    question: string
    answer: string
    bookmark: boolean
  }[]
  mutateToggleBookmark: (data: { keypointId: number; bookmark: boolean }) => void
}) {
  return (
    <Accordion type="multiple" className="flex flex-col gap-[19px]">
      {keyPoints.map((keyPoint, index) => (
        <AccordionItem value={keyPoint.id.toString()} key={keyPoint.id}>
          <AccordionTrigger
            className="flex items-center justify-between py-[12px]"
            chevronDownIcon={
              <div className="flex size-[24px] items-center justify-center rounded-full bg-blue-02">
                <ChevronDown size={16} color="#7095F8" strokeWidth={3} />
              </div>
            }
          >
            <div className="flex gap-[4px]">
              <div className="flex w-[16px] shrink-0 text-text-bold text-blue-06">{index + 1}</div>
              <span className="pr-[8px] text-left text-text-medium text-gray-09">
                {keyPoint.question}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-0 pl-[20px]">
            <div className="flex flex-col gap-[12px]">
              <div className="!text-text-regular text-gray-08">{keyPoint.answer}</div>
              <div
                role="button"
                onClick={() =>
                  mutateToggleBookmark({
                    keypointId: keyPoint.id,
                    bookmark: !keyPoint.bookmark,
                  })
                }
                className={cn(
                  'h-[31px] w-[69px] rounded-[24px] border flex justify-center items-center !text-small1-bold',
                  keyPoint.bookmark
                    ? 'border-blue-03 bg-blue-02 text-blue-06'
                    : 'border-gray-04 text-gray-06'
                )}
              >
                {keyPoint.bookmark ? (
                  <div className="flex items-center gap-[4px]">
                    <FilledBookMarkIcon />
                    <span>저장됨</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-[4px]">
                    <AddBookMarkIcon />
                    <span>저장</span>
                  </div>
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

function AddBookMarkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.5549 3.11035C4.63809 3.11035 6.73723 3.11035 3.82042 3.11035C3.18329 3.11035 2.66602 3.58891 2.66602 4.17836V14.9431C2.66602 15.2524 3.03505 15.4362 3.31576 15.2699L7.5549 12.7399L11.794 15.2699V15.267C12.0748 15.4362 12.4438 15.2495 12.4438 14.9402V7.99924"
        stroke="#A2A6AB"
        strokeWidth="1.33329"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 3.11035L14.8889 3.11035"
        stroke="#A2A6AB"
        strokeWidth="1.33329"
        strokeLinecap="round"
      />
      <path
        d="M12.4434 0.666016L12.4434 5.5549"
        stroke="#A2A6AB"
        strokeWidth="1.33329"
        strokeLinecap="round"
      />
    </svg>
  )
}

function FilledBookMarkIcon() {
  return (
    <svg width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.33548 12.9333L5 10.2424L0.664516 12.9333C0.377419 13.1103 0 12.9147 0 12.5857V1.13597C0 0.509016 0.529032 0 1.18064 0H8.81935C9.47097 0 10 0.509016 10 1.13597V12.5826C10 12.9116 9.62258 13.1103 9.33548 12.9302V12.9333Z"
        fill="#577CFF"
      />
    </svg>
  )
}
