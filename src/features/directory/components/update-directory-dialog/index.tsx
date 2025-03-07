import { useUpdateDirectoryInfo } from '@/requests/directory/hooks'
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/shared/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { cn } from '@/shared/lib/utils'
import EmojiPicker from 'emoji-picker-react'
import { useEffect, useState } from 'react'

interface Props {
  open: boolean
  onOpenChange: (value: boolean) => void
  directoryId: number | null
  prevName: string
  prevEmoji: string
}

const UpdateDirectoryDialog = ({ open, onOpenChange, directoryId, prevName, prevEmoji }: Props) => {
  const [name, setName] = useState(prevName ?? '')
  const [emoji, setEmoji] = useState(prevEmoji ?? '📁')
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)

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

    onOpenChange(false)
  }

  // 모바일 키보드 감지
  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        setIsKeyboardOpen(window.visualViewport.height < window.innerHeight)
      }
    }

    window.visualViewport?.addEventListener('resize', handleResize)
    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          'flex min-h-[190px] w-[280px] flex-col items-center justify-between rounded-[16px] bg-background-base-01',
          isKeyboardOpen ? 'top-[10vh] translate-y-0' : 'top-[50%] translate-y-[-50%]'
        )}
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
