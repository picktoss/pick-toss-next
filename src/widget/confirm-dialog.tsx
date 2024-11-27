import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog'

interface Props {
  triggerComponent: React.ReactNode
  title: string
  content: React.ReactNode
  cancelText?: string
  confirmButton: React.ReactNode
}

const ConfirmDialogWidget = ({
  triggerComponent,
  title,
  content,
  cancelText = '취소',
  confirmButton,
}: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerComponent}</DialogTrigger>

      <DialogContent
        className="flex min-h-[190px] w-[280px] flex-col items-center justify-between rounded-[16px] bg-background-base-01"
        displayCloseButton={false}
      >
        <DialogTitle className="mb-[32px] w-full text-subtitle2-bold">{title}</DialogTitle>

        <div className="flex h-[40px] w-full">{content}</div>

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
