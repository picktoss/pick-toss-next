'use client'

import { useDirectoryContext } from '@/features/directory/contexts/directory-context'
import EditCancelDialog from '@/features/modify/components/edit-cancel-dialog'
import { useEditDocumentContext } from '@/features/modify/context/edit-document-context'
import { useUpdateDocument } from '@/requests/document/hooks'
import { toast } from '@/shared/hooks/use-toast'
import { cn } from '@/shared/lib/utils'
import { useParams, useRouter } from 'next/navigation'

const Header = () => {
  const { id } = useParams()
  const router = useRouter()
  const { mutate: updateDocumentMutate } = useUpdateDocument(Number(id))
  const { documentTitle: title, editorMarkdownContent: content } = useEditDocumentContext()
  const { selectedDirectory } = useDirectoryContext()

  const handleClickSave = (id: number, title: string, content: string) => {
    if (title.trim().length === 0 || content.trim().length === 0) {
      alert('제목과 내용을 입력해주세요')
      return
    }

    const blob = new Blob([content], { type: 'text/markdown' })
    const file = new File([blob], `${title}.md`, { type: 'text/markdown' })

    updateDocumentMutate(
      { documentId: id, requestBody: { name: title, file } },
      {
        onSuccess: () => {
          toast({ description: '노트가 수정되었어요' })
          router.push('/document/' + String(id))
        },
      }
    )
  }

  return (
    <header>
      <div
        className={cn(
          'fixed right-1/2 top-0 z-20 flex h-[54px] w-full max-w-mobile translate-x-1/2 bg-background-base-01 px-[16px]'
        )}
      >
        <div className="flex size-full items-center justify-between">
          <EditCancelDialog />

          <div className="rounded-full bg-background-base-02 px-[16px] py-[5px] text-text1-medium">
            {selectedDirectory?.emoji ?? ''} {selectedDirectory?.name ?? '전체 노트'}
          </div>

          <button
            onClick={() => handleClickSave(Number(id), title, content)}
            className="text-button2 text-button-text-primary"
          >
            저장
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
