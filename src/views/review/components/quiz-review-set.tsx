import Icon from '@/shared/components/icon'
import ProDialogTriggerWrapper from '@/shared/components/pro-dialog-trigger-wrapper'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import Link from 'next/link'
import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  dateString: string
  quizCount: number
  isDone: boolean
  redirectUrl: string
}

export const QuizReviewSet = ({ dateString, quizCount, isDone, redirectUrl, className }: Props) => {
  return (
    <div className={cn(className)}>
      <div
        className={cn(
          'relative flex h-[148px] w-[140px] shrink-0 flex-col justify-between rounded-[12px] pb-[13px] pt-[17px]',
          isDone ? 'bg-white xl:border xl:border-gray-02' : 'bg-orange-01'
        )}
      >
        <div className="flex flex-col gap-[4px] px-[16px]">
          <div className="text-body1-bold text-gray-08">{dateString}</div>
          <div className="text-small1-regular text-gray-06">퀴즈 {quizCount}개</div>

          <div className="absolute right-[17px]">
            {isDone ? <Icon name="check" /> : <Icon name="stars" />}
          </div>
        </div>
        <Link href={redirectUrl} className="px-[10px]">
          <ProDialogTriggerWrapper asChild>
            <Button
              className={cn(
                'h-[33px] w-full rounded-full !text-body2-medium',
                isDone && 'bg-gray-02 text-gray-08 hover:bg-gray-04/60'
              )}
            >
              {isDone ? '다시 풀기' : '시작하기'}
            </Button>
          </ProDialogTriggerWrapper>
        </Link>
      </div>
    </div>
  )
}
