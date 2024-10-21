import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { cn } from '@/shared/lib/utils'
import EmojiPicker from 'emoji-picker-react'
import { useEffect, useState } from 'react'

interface Props {
  triggerComponent: JSX.Element
  title: string
  onConfirm: () => void
  confirmText: string
  prev?: { name: string; emoji: string }
}

const SetFolderNameDialog = ({ triggerComponent, title, onConfirm, confirmText, prev }: Props) => {
  const [name, setName] = useState('')
  const [emoji, setEmoji] = useState('📁')

  useEffect(() => {
    if (prev) {
      setName(prev.name)
      setEmoji(prev.emoji)
    }
  }, [prev])

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerComponent}</DialogTrigger>

      <DialogContent
        className="flex min-h-[190px] w-[280px] flex-col items-center justify-between rounded-[16px] bg-background-base-01"
        displayCloseButton={false}
      >
        <DialogTitle className="mb-[32px] w-full text-subtitle2-bold">{title}</DialogTitle>

        <div className="flex h-[40px] w-full">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex-center mr-[10px] size-[40px] rounded-[8px] bg-background-base-02 text-xl">
                {emoji}
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <EmojiPicker
                skinTonesDisabled
                width={'95vw'}
                height={'45vh'}
                onEmojiClick={(emojiData) => {
                  setEmoji(emojiData.emoji)
                }}
              />
            </DropdownMenuContent>
          </DropdownMenu>

          <input
            className="grow border-b border-border-divider py-[10px]"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="폴더 이름"
          />
        </div>

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

export default SetFolderNameDialog
