'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useEditDocumentContext } from '../contexts/edit-document-context'
import { useGetCategoryQuery } from '@/apis/fetchers/category/get-category/query'
import { cn } from '@/lib/utils'
import { MAX_CONTENT_LENGTH } from '@/constants/document'

interface Props {
  categoryId: number
  handleSubmit: ({
    documentName,
    editorContent,
  }: {
    documentName: string
    editorContent: string
  }) => Promise<void>
  isLoading: boolean
}

export function Header({ categoryId, handleSubmit, isLoading }: Props) {
  const router = useRouter()
  const { documentName, editorMarkdownContent } = useEditDocumentContext()
  const { data: category } = useGetCategoryQuery({ categoryId })

  return (
    <div className="sticky top-0 z-10 bg-gray-01 opacity-95 shadow-md">
      <div className="relative flex h-[56px] items-center border-b border-gray-04 px-[20px]">
        <Button
          variant="ghost"
          className="ml-[-10px] p-[10px] !text-body2-medium text-gray-08"
          onClick={() => router.back()}
          disabled={isLoading}
        >
          취소
        </Button>

        <div className="center flex w-[180px] justify-center gap-[20px] border-none bg-inherit">
          <div className="flex items-center gap-[8px] text-body1-bold text-gray-09">
            <div>{category?.emoji}</div>
            <div>{category?.name}</div>
          </div>
        </div>

        <Button
          variant="ghost"
          className="ml-auto mr-[-10px] p-[10px] !text-body2-bold text-orange-06 hover:text-orange-06"
          onClick={() =>
            handleSubmit({
              documentName,
              editorContent: editorMarkdownContent,
            })
          }
          disabled={isLoading}
        >
          수정하기
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
      </div>
    </div>
  )
}
