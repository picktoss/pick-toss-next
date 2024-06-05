import { DialogClose, DialogContent } from '@/components/ui/dialog'
import { useState } from 'react'
import CategoryTag from './category-tag'
import Image from 'next/image'
import icons from '@/constants/icons'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { Category, CategoryTagType } from '@/apis/fetchers/category/get-categories'
import { updateCategory } from '@/apis/fetchers/category/update-category'

interface CategoryInfo {
  name: string
  emoji: string
  tag: CategoryTagType
}

interface Props extends Category {}

export default function ModifyCategoryModal({ id, name, emoji, tag }: Props) {
  const [categoryInfo, setCategoryInfo] = useState<CategoryInfo>({
    name: name,
    emoji: emoji || '📁',
    tag: tag,
  })

  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
  })

  const handleCreateCategory = () => {
    mutate({ ...categoryInfo, categoryId: id, accessToken: session?.user.accessToken || '' })
  }

  return (
    <DialogContent
      displayCloseButton={false}
      className="w-[448px]"
      onOpenAutoFocus={(e) => e.preventDefault()}
    >
      <h4 className="mb-[30px] text-h4-bold text-gray-09">폴더 정보 수정하기</h4>
      {/* TODO: emoji, tag 설정 기능 */}
      {/* 현재는 name 수정만 가능 */}
      <div className="mb-[24px] flex items-center gap-[10px]">
        <div className="flex size-[32px] items-center justify-center rounded-md border bg-gray-01">
          {categoryInfo.emoji || '📁'}
        </div>
        <div className="flex h-[32px] w-[103px] items-center justify-between rounded-md border bg-gray-01 px-[14px]">
          <CategoryTag tag={categoryInfo.tag} />
          <Image src={icons.chevronDown} alt="" width={16} height={16} />
        </div>
      </div>
      <input
        className="mb-[40px] h-[32px] w-full rounded-md border bg-gray-01 px-[12px] text-body2-regular outline-none"
        value={categoryInfo.name}
        onChange={(event) => setCategoryInfo((prev) => ({ ...prev, name: event.target.value }))}
      />
      <div className="flex justify-center">
        <DialogClose asChild>
          <Button className="w-[160px]" onClick={handleCreateCategory}>
            완료
          </Button>
        </DialogClose>
      </div>
    </DialogContent>
  )
}
