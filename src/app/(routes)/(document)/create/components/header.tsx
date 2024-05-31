'use client'

import { CategoryDTO } from '@/apis/types/dto/category.dto'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { CategorySelect } from './category-select'

interface Props {
  categories: CategoryDTO[]
}

export function Header({ categories }: Props) {
  const router = useRouter()

  return (
    <div className="sticky top-0 bg-inherit shadow-md">
      <div className="relative flex h-[56px] items-center border-b border-gray-04 px-[20px]">
        <Button
          variant="ghost"
          className="!text-body2-medium text-gray-08"
          onClick={() => router.back()}
        >
          취소
        </Button>

        <CategorySelect categories={categories} />

        <Button
          variant="ghost"
          className="ml-auto bg-gradient-to-r from-[#93B0FF] to-[#FF8428] bg-clip-text px-0 pl-[15px] !text-body2-bold text-transparent hover:text-transparent"
        >
          등록하기
        </Button>
      </div>
    </div>
  )
}
