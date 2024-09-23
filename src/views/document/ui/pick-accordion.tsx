'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion'
import { useAmplitudeContext } from '@/shared/hooks/use-amplitude-context'
import { cn } from '@/shared/lib/utils'
import { ChevronDown } from 'lucide-react'
import { AddBookMarkIcon, FilledBookMarkIcon } from './pick-icons'

export function PickAccordion({
  keyPoints,
  handleToggleBookmark,
}: {
  keyPoints: {
    id: number
    question: string
    answer: string
    bookmark: boolean
  }[]
  handleToggleBookmark: (data: { keyPointId: number; bookmark: boolean }) => void
}) {
  const { clickedEvent } = useAmplitudeContext()

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
                  handleToggleBookmark({
                    keyPointId: keyPoint.id,
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
                  <div
                    className="flex items-center gap-[4px]"
                    onClick={() =>
                      clickedEvent({
                        buttonType: 'bookmark',
                        buttonName: 'remove_bookmark_button',
                      })
                    }
                  >
                    <FilledBookMarkIcon />
                    <span>저장됨</span>
                  </div>
                ) : (
                  <div
                    className="flex items-center gap-[4px]"
                    onClick={() =>
                      clickedEvent({
                        buttonType: 'bookmark',
                        buttonName: 'add_bookmark_button',
                      })
                    }
                  >
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
