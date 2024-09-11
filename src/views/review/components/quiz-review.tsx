import ProDialogTriggerWrapper from '@/shared/components/pro-dialog-trigger-wrapper'
import ProTag from '@/shared/components/pro-tag'
import { cn } from '@/shared/lib/utils'
import { HTMLAttributes } from 'react'
import { QuizReviewSet } from './quiz-review-set'
import { getCurrentDate } from '@/shared/utils/date'

interface Props extends HTMLAttributes<HTMLDivElement> {}

export const QuizReview = ({ className }: Props) => {
  const curMonth = getCurrentDate({ month: true })

  return (
    <div className={cn(className)}>
      <section className="flex flex-col gap-[24px] rounded-none p-[20px] pb-[22px] xl:rounded-[12px] xl:bg-white">
        <div className="flex flex-col gap-[8px]">
          <h2 className="flex items-center gap-[8px] text-h4-bold text-gray-09">
            퀴즈 톺아보기{' '}
            <ProDialogTriggerWrapper>
              <ProTag />
            </ProDialogTriggerWrapper>
          </h2>
          <p className="text-body2-regular text-gray-07">
            틀렸거나 고민했던 퀴즈만 모아 복습 세트를 만들어드려요
          </p>
        </div>

        <div className="flex gap-[8px] overflow-auto scrollbar-hide">
          {Array.from({ length: 4 }).map((_, idx) => (
            <QuizReviewSet
              key={idx}
              redirectUrl="#"
              dateString={`${curMonth} 1주차`}
              quizCount={20}
              isDone={idx !== 0}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
