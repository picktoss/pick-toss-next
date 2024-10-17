'use client'

import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/shared/components/ui/dialog'
import { cn } from '@/shared/lib/utils'

interface Props {
  open: boolean
  onOpenChange: (value: boolean) => void
  title: string
  content: JSX.Element
  onConfirm: () => void
  confirmText: string
}

// QuizNoteDialog 컴포넌트
const QuizNoteDialog = ({ open, onOpenChange, title, content, onConfirm, confirmText }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex min-h-[190px] w-[280px] flex-col items-center justify-between rounded-[16px] bg-background-base-01"
        displayCloseButton={false}
      >
        <DialogTitle className="mb-[32px] w-full text-subtitle2-bold">{title}</DialogTitle>

        <div className="flex h-[40px] w-full">{content}</div>

        <div className="mt-[40px] flex w-full justify-end text-button2">
          <DialogClose asChild>
            <button className="p-[4px] text-button-text-tertiary">취소</button>
          </DialogClose>
          <DialogClose asChild>
            <button
              onClick={onConfirm}
              className={cn(
                'ml-[21px] p-[4px] text-button-text-primary',
                confirmText.includes('삭제') && 'text-button-text-critical'
              )}
            >
              {confirmText}
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default QuizNoteDialog
