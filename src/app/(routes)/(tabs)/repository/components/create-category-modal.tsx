import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ReactNode, useState } from 'react'
import CategoryTag from './category-tag'
import Image from 'next/image'
import icons from '@/constants/icons'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCategory } from '@/apis/fetchers/category/create-category'
import { useSession } from 'next-auth/react'
import { CategoryTagType } from '@/apis/fetchers/category/get-categories'

interface CategoryInfo {
  name: string
  emoji: string
  tag: CategoryTagType
}

interface Props {
  trigger: ReactNode
}

export default function CreateCategoryModal({ trigger }: Props) {
  const [categoryInfo, setCategoryInfo] = useState<CategoryInfo>({
    name: '',
    emoji: '😀',
    tag: 'IT',
  })

  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
  })

  const handleCreateCategory = () => {
    mutate({ ...categoryInfo, accessToken: session?.user.accessToken || '' })
    setCategoryInfo((prev) => ({ ...prev, name: '' }))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent displayCloseButton={false} className="w-[560px]">
        <h4 className="mb-[8px] text-h4-bold text-gray-09">폴더 만들기</h4>
        <p className="mb-[32px] text-small1-regular text-gray-07">
          폴더 아이콘, 카테고리, 폴더 이름을 설정해주세요
        </p>

        <div className="mb-[34px] flex items-center gap-[10px]">
          <div className="flex size-[32px] items-center justify-center rounded-md border bg-gray-01">
            {categoryInfo.emoji}
          </div>
          <div className="flex h-[32px] w-[103px] items-center justify-between rounded-md border bg-gray-01 px-[14px]">
            <CategoryTag tag={categoryInfo.tag} />
            <Image src={icons.chevronDown} alt="" width={16} height={16} />
          </div>
          <input
            className="h-[32px] flex-1 rounded-md border bg-gray-01 px-[12px] text-body2-regular outline-none"
            value={categoryInfo.name}
            onChange={(event) => setCategoryInfo((prev) => ({ ...prev, name: event.target.value }))}
          />
        </div>
        <DialogClose asChild>
          <div className="flex justify-center">
            <Button className="w-[280px]" onClick={handleCreateCategory}>
              폴더 만들기
            </Button>
          </div>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
