'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useEditDocumentContext } from '../contexts/edit-document-context'
import { useQuery } from '@tanstack/react-query'
import { getCategory } from '@/apis/fetchers/category/get-category'
import { useSession } from 'next-auth/react'

interface Props {
  categoryId: number
  handleSubmit: ({
    documentName,
    editorContent,
  }: {
    documentName: string
    editorContent: string
  }) => Promise<void>
}

export function Header({ categoryId, handleSubmit }: Props) {
  const router = useRouter()
  const { data: session } = useSession()
  const { documentName, editorMarkdownContent } = useEditDocumentContext()

  const { data: category } = useQuery({
    queryKey: ['category', categoryId],
    queryFn: () =>
      getCategory({
        accessToken: session?.user.accessToken || '',
        categoryId,
      }),
    enabled: !!session?.user.accessToken,
  })

  return (
    <div className="sticky top-0 z-10 bg-gray-01 opacity-95 shadow-md">
      <div className="relative flex h-[56px] items-center border-b border-gray-04 px-[20px]">
        <Button
          variant="ghost"
          className="!text-body2-medium text-gray-08"
          onClick={() => router.back()}
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
          className="ml-auto px-0 pl-[15px] !text-body2-bold text-orange-06 hover:text-orange-06"
          onClick={() =>
            handleSubmit({
              documentName,
              editorContent: editorMarkdownContent,
            })
          }
        >
          수정하기
        </Button>
      </div>
    </div>
  )
}
