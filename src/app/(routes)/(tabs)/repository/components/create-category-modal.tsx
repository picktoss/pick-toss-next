import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ReactNode, useState } from 'react'
import CategoryTag from './category-tag'
import Image from 'next/image'
import icons from '@/constants/icons'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCategory } from '@/apis/fetchers/category/create-category'
import { useSession } from 'next-auth/react'
import { CATEGORY_TAG_TYPE, CategoryTagType } from '@/apis/fetchers/category/get-categories'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import EmojiPicker from 'emoji-picker-react'

interface Props {
  trigger: ReactNode
}

export default function CreateCategoryModal({ trigger }: Props) {
  const [name, setName] = useState('')
  const [emoji, setEmoji] = useState('📁')
  const [tag, setTag] = useState<CategoryTagType>('IT')

  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
  })

  const resetState = () => {
    setName('')
    setEmoji('📁')
    setTag('IT')
  }

  const handleCreateCategory = () => {
    mutate({ name, emoji, tag, accessToken: session?.user.accessToken || '' })
    resetState()
  }

  return (
    <Dialog onOpenChange={resetState}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        displayCloseButton={false}
        className="w-[560px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <h4 className="mb-[8px] text-h4-bold text-gray-09">폴더 만들기</h4>
        <p className="mb-[32px] text-small1-regular text-gray-07">
          폴더 아이콘, 카테고리, 폴더 이름을 설정해주세요
        </p>
        {/* TODO: emoji, tag 설정 기능 */}
        <div className="mb-[34px] flex items-center gap-[10px]">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex size-[32px] items-center justify-center rounded-md border bg-gray-01">
                {emoji}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <EmojiPicker
                skinTonesDisabled
                width={320}
                height={400}
                onEmojiClick={(emojiData) => {
                  setEmoji(emojiData.emoji)
                }}
              />
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex h-[32px] w-[103px] items-center justify-between rounded-md border bg-gray-01 px-[14px]">
                <CategoryTag tag={tag} />
                <Image src={icons.chevronDown} alt="" width={16} height={16} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {CATEGORY_TAG_TYPE.map((tag) => (
                <DropdownMenuItem key={tag} onClick={() => setTag(tag)}>
                  <CategoryTag tag={tag} />
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <input
            className="h-[32px] flex-1 rounded-md border bg-gray-01 px-[12px] text-body2-regular outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <DialogClose asChild>
            <Button className="w-[280px]" onClick={handleCreateCategory}>
              폴더 만들기
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
