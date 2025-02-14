import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog'
import { cn } from '@/shared/lib/utils'

interface Props {
  confirmButton: React.ReactNode
  triggerComponent?: React.ReactNode
  open?: boolean
  onOpenChange?: (value: boolean) => void
  title?: string
  content: React.ReactNode
  cancelText?: string
}

const ConfirmDialogWidget = ({
  triggerComponent,
  open,
  onOpenChange,
  title,
  content,
  cancelText = '취소',
  confirmButton,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{triggerComponent}</DialogTrigger>

      <DialogContent
        className={cn(
          'flex min-h-[190px] w-[280px] flex-col items-center justify-between rounded-[16px] bg-background-base-01',
          !title && 'min-h-fit justify-center'
        )}
        displayCloseButton={false}
      >
        {title && (
          <DialogTitle className="mb-[32px] w-full text-subtitle2-bold">{title}</DialogTitle>
        )}

        <div className={cn('flex min-h-[40px] w-full', !title && 'min-h-fit')}>{content}</div>

        <div className="mt-[40px] flex w-full justify-end text-button2">
          <DialogClose asChild>
            <button className="p-[4px] text-button-text-tertiary">{cancelText}</button>
          </DialogClose>
          <DialogClose asChild>{confirmButton}</DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmDialogWidget
