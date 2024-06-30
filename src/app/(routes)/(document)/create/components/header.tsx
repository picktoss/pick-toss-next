'use client'

import { CategoryDTO } from '@/apis/types/dto/category.dto'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { CategorySelect } from './category-select'
import { useCreateDocumentContext } from '../contexts/create-document-context'
import { cn } from '@/lib/utils'
import { MAX_CONTENT_LENGTH } from '@/constants/document'

interface Props {
  categories: CategoryDTO[]
  handleSubmit: ({
    categoryId,
    documentName,
    editorContent,
  }: {
    categoryId: number
    documentName: string
    editorContent: string
  }) => Promise<void>
}

export function Header({ categories, handleSubmit }: Props) {
  const router = useRouter()
  const { documentName, selectedCategoryId, editorMarkdownContent } = useCreateDocumentContext()

  return (
    <div className="sticky top-0 z-10 bg-white opacity-95 shadow-md">
      <div className="relative flex h-[56px] items-center border-b border-gray-04 px-[20px]">
        <Button
          variant="ghost"
          className="ml-[-10px] p-[10px] !text-body2-medium text-gray-08"
          onClick={() => router.back()}
        >
          취소
        </Button>

        <CategorySelect categories={categories} />

        <Button
          variant="ghost"
          className="ml-auto mr-[-10px] p-[10px] !text-body2-bold text-orange-06 hover:text-orange-06"
          onClick={() =>
            handleSubmit({
              documentName,
              categoryId: selectedCategoryId,
              editorContent: editorMarkdownContent,
            })
          }
        >
          등록하기
        </Button>
      </div>
      <div className="flex h-[40px] items-center justify-between bg-gray-01 px-[20px]">
        <div className="text-body2-medium text-gray-06">
          <span
            className={cn(
              'text-blue-06',
              editorMarkdownContent.length > MAX_CONTENT_LENGTH && 'text-red-600'
            )}
          >
            {editorMarkdownContent.length.toLocaleString('ko-kr')}자
          </span>{' '}
          / 15,000자
        </div>
        <div className="text-body2-regular text-gray-06">
          남은 등록 가능 횟수 <span className="text-body2-bold">00회</span>
        </div>
      </div>
    </div>
  )
}
