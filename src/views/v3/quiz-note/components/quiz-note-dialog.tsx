import { Dialog, DialogClose, DialogContent } from '@/shared/components/ui/dialog'
import { useQuizNoteContext } from '../context/quiz-note-context'
import Text from '@/shared/components/text'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import EmojiPicker from 'emoji-picker-react'
import { cn } from '@/shared/lib/utils'

const QuizNoteDialog = () => {
  const [name, setName] = useState('')
  const [emoji, setEmoji] = useState('📁')
  const { dialogState, setDialogState } = useQuizNoteContext()

  const handleDialogOpen = (value: boolean) => {
    setDialogState({ ...dialogState, isOpen: value })
  }

  return (
    <Dialog open={dialogState.isOpen} onOpenChange={handleDialogOpen}>
      <DialogContent
        className="flex min-h-[190px] w-[280px] flex-col items-center justify-between rounded-[16px] bg-background-base-01"
        displayCloseButton={false}
      >
        <h4 className="mb-[32px] w-full text-subtitle2-bold">
          {dialogState.type === 'create' && '폴더 만들기'}
          {dialogState.type === 'edit' && '폴더 이름 바꾸기'}
          {dialogState.type === 'delete' && '폴더 삭제'}
        </h4>

        <div className="flex h-[40px] w-full">
          {dialogState.type === 'delete' ? (
            // data : 해당 폴더 이름, 노트 개수 필요
            <Text typography="text1-medium">
              전공 공부 폴더와 <span className="text-text-wrong">14개의 노트</span>가 <br /> 모두
              삭제됩니다
            </Text>
          ) : (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <button className="flex-center mr-[10px] size-[40px] rounded-[8px] bg-background-base-02">
                    <Text className="text-2xl">{emoji}</Text>
                  </button>
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
          )}
        </div>

        <div className="mt-[40px] flex w-full justify-end text-button2">
          <DialogClose asChild>
            <button className="p-[4px] text-button-text-tertiary">취소</button>
          </DialogClose>
          <DialogClose asChild>
            <button
              className={cn(
                'ml-[21px] p-[4px] text-button-text-primary',
                dialogState.type === 'delete' && 'text-button-text-critical'
              )}
            >
              {dialogState.type === 'create' && '만들기'}
              {dialogState.type === 'edit' && '저장'}
              {dialogState.type === 'delete' && '삭제하기'}
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default QuizNoteDialog
