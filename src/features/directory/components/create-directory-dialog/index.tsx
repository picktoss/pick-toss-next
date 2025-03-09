'use client'

import { useCreateDirectory } from '@/requests/directory/hooks'
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/shared/components/ui/dialog'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import EmojiPicker from 'emoji-picker-react'
import { useEffect, useRef, useState } from 'react'

interface Props {
  open: boolean
  onOpenChange: (value: boolean) => void
}

const CreateDirectoryDialog = ({ open, onOpenChange }: Props) => {
  const [name, setName] = useState('')
  const [emoji, setEmoji] = useState('📁')
  const [emojiOpen, setEmojiOpen] = useState(false)
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)

  const emojiPickerRef = useRef<HTMLDivElement>(null)

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
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setEmoji('📁')
        setName('')
        onOpenChange(value)
      }}
    >
      <DialogContent
        className={cn(
          'flex min-h-[190px] w-[280px] flex-col items-center justify-between rounded-[16px] bg-background-base-01',
          isKeyboardOpen && 'top-[50%] translate-y-[-50%]'
        )}
        displayCloseButton={false}
      >
        <DialogTitle className="mb-[32px] w-full">
          <Text typography="subtitle2-bold">폴더 만들기</Text>
        </DialogTitle>

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
