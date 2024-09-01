import { Dialog, DialogClose, DialogContent } from '@/shared/components/ui/dialog'
import { useState } from 'react'
import CategoryTag from './category-tag'
import Image from 'next/image'
import icons from '@/constants/icons'
import { Button } from '@/shared/components/ui/button'
import { Category, CategoryTagType } from '@/actions/fetchers/category/get-categories'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import EmojiPicker from 'emoji-picker-react'
import { useUpdateCategoryMutation } from '@/actions/fetchers/category/update-category/mutation'
import { CATEGORY_TAG_TYPE } from '@/types/category'

interface Props extends Category {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ModifyCategoryModal({ id, name, emoji, tag, open, onOpenChange }: Props) {
  const [newName, setNewName] = useState(name)
  const [newEmoji, setNewEmoji] = useState(emoji || '📁')
  const [newTag, setNewTag] = useState<CategoryTagType>(tag)

  const { mutate: updateCategoryMutate } = useUpdateCategoryMutation()

  const handleUpdateCategory = () => {
    if (newName === '') return alert('폴더 이름을 설정해주세요')

    updateCategoryMutate({
      name: newName,
      emoji: newEmoji,
      tag: newTag,
      categoryId: id,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        displayCloseButton={false}
        className="w-[320px] lg:w-[448px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <h4 className="mb-[30px] text-h4-bold text-gray-09">폴더 정보 수정하기</h4>
        <div className="mb-[24px] flex items-center gap-[10px]">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex size-[32px] items-center justify-center rounded-md border bg-gray-01">
                {newEmoji}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <EmojiPicker
                skinTonesDisabled
                width={320}
                height={400}
                onEmojiClick={(emojiData) => {
                  setNewEmoji(emojiData.emoji)
                }}
              />
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex h-[32px] w-[103px] items-center justify-between rounded-md border bg-gray-01 px-[14px]">
                <CategoryTag tag={newTag} />
                <Image src={icons.chevronDown} alt="" width={16} height={16} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {CATEGORY_TAG_TYPE.filter((tag) => tag !== 'DEFAULT').map((tag) => (
                <DropdownMenuItem key={tag} onClick={() => setNewTag(tag)}>
                  <CategoryTag tag={tag} />
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <input
          className="mb-[40px] h-[32px] w-full rounded-md border bg-gray-01 px-[12px] text-body2-regular outline-none"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="폴더 이름"
        />
        <div className="flex justify-center">
          <DialogClose asChild>
            <Button className="w-[160px]" onClick={handleUpdateCategory}>
              완료
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
