'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import EmojiPicker from 'emoji-picker-react'
import { useState } from 'react'

const SetFolderNameContent = () => {
  const [name, setName] = useState('')
  const [emoji, setEmoji] = useState('📁')

  return (
    <>
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
    </>
  )
}

export default SetFolderNameContent
