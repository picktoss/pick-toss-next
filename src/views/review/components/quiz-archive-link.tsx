import ProDialogTriggerWrapper from '@/shared/components/pro-dialog-trigger-wrapper'
import { cn } from '@/shared/lib/utils'
import { HTMLAttributes } from 'react'
import { ArchiveLink } from './archive-link'
import Icon from '@/shared/components/icon'

interface Props extends HTMLAttributes<HTMLDivElement> {}

export const QuizArchiveLink = ({ className }: Props) => {
  return (
    <div className={cn(className)}>
      <ProDialogTriggerWrapper asChild>
        <ArchiveLink
          redirectUrl="#"
          title="퀴즈 기록"
          icon={
            <div className="flex size-[56px] items-center justify-center rounded-full bg-blue-01">
              <Icon name="quiz-archive" className="size-[31.7px]" />
            </div>
          }
          count={0}
          isPro
        />
      </ProDialogTriggerWrapper>
    </div>
  )
}
