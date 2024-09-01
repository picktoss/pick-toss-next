import { Dialog, DialogContent, DialogTrigger } from '@/shared/components/ui/dialog'
import { ReactNode, useState } from 'react'
import Image from 'next/image'
import icons from '@/constants/icons'
import { Button } from '@/shared/components/ui/button'
import { CategoryTagType } from '@/actions/fetchers/category/get-categories'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import EmojiPicker from 'emoji-picker-react'
import CategoryTag from '@/app/(routes)/(tabs)/repository/components/category-tag'
import Loading from './loading'
import { cn } from '@/shared/lib/utils'
import { useCreateCategoryMutation } from '@/actions/fetchers/category/create-category/mutation'
import { CATEGORY_TAG_TYPE } from '@/types/category'

interface Props {
  trigger: ReactNode
  externalOpen?: boolean
  onOpenChange?: (value: boolean) => void
  onSuccess?: () => void
}

export default function CreateCategoryDialog({
  trigger,
  externalOpen,
  onOpenChange,
  onSuccess,
}: Props) {
  const [name, setName] = useState('')
  const [emoji, setEmoji] = useState('📁')
  const [tag, setTag] = useState<CategoryTagType>('IT')

  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const { mutate: createCategoryMutate } = useCreateCategoryMutation()

  const resetState = () => {
    setName('')
    setEmoji('📁')
    setTag('IT')
  }

  const handleCreateCategory = () => {
    if (name === '') return alert('폴더 이름을 설정해주세요.')

    setLoading(true)
    createCategoryMutate(
      { name, emoji, tag },
      {
        onSuccess: () => {
          onSuccess && onSuccess()
          setLoading(false)
          setIsOpen(false)
          resetState()
        },
      }
    )
  }

  return (
    <Dialog
      open={externalOpen ?? isOpen}
      onOpenChange={(value) => {
        onOpenChange != null && onOpenChange(value)
        setIsOpen(value)
        resetState()
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        displayCloseButton={false}
        className="w-[335px] lg:w-[560px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {isLoading && <Loading center size="small" />}

        <div className={cn(isLoading && 'opacity-0')}>
          <h4 className="mb-[8px] text-h4-bold text-gray-09">폴더 만들기</h4>
          <p className="mb-[32px] text-small1-regular text-gray-07">
            폴더 아이콘, 카테고리, 폴더 이름을 설정해주세요
          </p>
          <div className="mb-[34px] lg:flex lg:items-center lg:gap-[10px]">
            <div className="mb-[24px] flex items-center gap-[10px] lg:mb-0">
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
                  {CATEGORY_TAG_TYPE.filter((tag) => tag !== 'DEFAULT').map((tag) => (
                    <DropdownMenuItem key={tag} onClick={() => setTag(tag)}>
                      <CategoryTag tag={tag} />
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <input
              className="h-[48px] w-full rounded-md border bg-gray-01 px-[12px] text-body2-regular outline-none lg:h-[32px] lg:w-auto lg:flex-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="폴더 이름"
            />
          </div>
          <div className="flex justify-center">
            <Button className="w-[280px]" onClick={handleCreateCategory}>
              폴더 만들기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
