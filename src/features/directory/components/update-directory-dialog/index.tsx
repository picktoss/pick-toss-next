import { useUpdateDirectoryInfo } from '@/requests/directory/hooks'
import Icon from '@/shared/components/custom/icon'
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
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import EmojiPicker from 'emoji-picker-react'
import { useState } from 'react'

interface Props {
  directoryId: number | null
  prevName: string
  prevEmoji: string
}

const UpdateDirectoryDialog = ({ directoryId, prevName, prevEmoji }: Props) => {
  const [open, setOpen] = useState(false)

  const [name, setName] = useState(prevName ?? '')
  const [emoji, setEmoji] = useState(prevEmoji ?? '📁')

  const { mutate: updateDirectoryMutate } = useUpdateDirectoryInfo()

  const handleUpdateDirectory = () => {
    if (name.trim() === '' || !directoryId) {
      return
    }

    updateDirectoryMutate({
      directoryId,
      name,
      emoji,
    })

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          className="w-[240px] cursor-pointer border-t border-border-divider px-[20px] py-[16px]"
          onSelect={(e) => e.preventDefault()}
        >
          <Text typography="subtitle2-medium" className="flex w-full items-center justify-between">
            폴더 이름 바꾸기
            <Icon name="write-line" className="size-[20px]" />
          </Text>
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent
        className="flex min-h-[190px] w-[280px] flex-col items-center justify-between rounded-[16px] bg-background-base-01"
        displayCloseButton={false}
      >
        <DialogTitle className="mb-[32px] w-full text-subtitle2-bold">폴더 이름 바꾸기</DialogTitle>

        <div className="flex h-[40px] w-full">
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
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
            className="grow border-b border-border-divider py-[10px] outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="폴더 이름"
          />
        </div>

        <div className="mt-[40px] flex w-full justify-end text-button2">
          <DialogClose asChild>
            <button className="p-[4px] text-button-text-tertiary">취소</button>
          </DialogClose>
          <button
            onClick={handleUpdateDirectory}
            className={cn('ml-[21px] p-[4px] text-button-text-primary')}
          >
            저장
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateDirectoryDialog
