import { useUpdateDirectoryInfo } from '@/requests/directory/hooks'
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/shared/components/ui/dialog'
import { useScreenSize } from '@/shared/hooks/use-screen-size'
import { cn } from '@/shared/lib/utils'
import EmojiPicker from 'emoji-picker-react'
import { useEffect, useRef, useState } from 'react'

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
  const [emojiOpen, setEmojiOpen] = useState(false)
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)
  const [isFirstContentRender, setIsFirstContentRender] = useState(true)

  const emojiPickerRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setEmojiOpen(false)
      }
    }

    if (emojiOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [emojiOpen])

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
          <button onClick={() => setEmojiOpen(!emojiOpen)} type="button" className="outline-none">
            <div className="flex-center mr-[10px] size-[40px] rounded-[8px] bg-background-base-02 text-xl">
              {emoji}
            </div>
          </button>

          {emojiOpen && (
            <div ref={emojiPickerRef} className="fixed right-1/2 top-[120px] translate-x-1/2">
              <EmojiPicker
                skinTonesDisabled
                width="95vw"
                height="40vh"
                onEmojiClick={(emojiData, e) => {
                  e.preventDefault()
                  setEmoji(emojiData.emoji)
                  setEmojiOpen(false)
                }}
                className="max-w-mobile"
              />
            </div>
          )}

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
