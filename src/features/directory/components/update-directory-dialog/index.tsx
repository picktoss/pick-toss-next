import { useUpdateDirectoryInfo } from '@/requests/directory/hooks'
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/shared/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { useScreenSize } from '@/shared/hooks/use-screen-size'
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
  const { isMobile } = useScreenSize()

  const [name, setName] = useState(prevName ?? '')
  const [emoji, setEmoji] = useState(prevEmoji ?? '📁')
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)
  const [isFirstContentRender, setIsFirstContentRender] = useState(true)

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

  useEffect(() => {
    if (!open) {
      setIsKeyboardOpen(false)
    }

    setIsFirstContentRender(open)
  }, [open])

  useEffect(() => {
    if (!isKeyboardOpen) {
      setIsFirstContentRender(false)
    }
  }, [isKeyboardOpen])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          'flex min-h-[190px] w-[280px] flex-col items-center justify-between rounded-[16px] bg-background-base-01',
          isMobile && isFirstContentRender && '!top-[10%] !translate-y-0'
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
              <div className="h-[45dvh] w-[95dvw] max-w-mobile overflow-y-auto">
                <EmojiPicker
                  skinTonesDisabled
                  width={'100%'}
                  height={'100%'}
                  onEmojiClick={(emojiData) => {
                    setEmoji(emojiData.emoji)
                  }}
                />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <input
            className="w-full border-b border-border-divider py-[10px] outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="폴더 이름"
            autoFocus={true}
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
