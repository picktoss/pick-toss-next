'use client'

import { useCreateDirectory } from '@/requests/directory/hooks'
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/shared/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import EmojiPicker from 'emoji-picker-react'
import { useState } from 'react'

interface Props {
  open: boolean
  onOpenChange: (value: boolean) => void
}

const CreateDirectoryDialog = ({ open, onOpenChange }: Props) => {
  const [name, setName] = useState('')
  const [emoji, setEmoji] = useState('📁')

  const { mutate: createDirectoryMutate } = useCreateDirectory()

  const handleCreateDirectory = () => {
    if (name.trim() === '') {
      return
    }

    createDirectoryMutate({
      name,
      emoji,
    })

    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setEmoji('📁')
        setName('')
        onOpenChange(value)
      }}
    >
      <DialogContent
        className="flex min-h-[190px] w-[280px] flex-col items-center justify-between rounded-[16px] bg-background-base-01"
        displayCloseButton={false}
      >
        <DialogTitle className="mb-[32px] w-full">
          <Text typography="subtitle2-bold">폴더 만들기</Text>
        </DialogTitle>

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
            className="w-full border-b border-border-divider py-[10px] outline-none"
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
            onClick={handleCreateDirectory}
            className={cn('ml-[21px] p-[4px] text-button-text-primary')}
          >
            만들기
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateDirectoryDialog
