'use client'

import { useDirectoryContext } from '@/features/directory/contexts/directory-context'
import { UpdateDocumentSchema } from '@/features/document/config'
import EditCancelDialog from '@/features/modify/components/edit-cancel-dialog'
import { useEditDocumentContext } from '@/features/modify/context/edit-document-context'
import { useUpdateDocument } from '@/requests/document/hooks'
import { useToast } from '@/shared/hooks/use-toast'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { cn } from '@/shared/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useId, useState } from 'react'

const Header = () => {
  const { id } = useParams()
  const router = useRouter()
  const [validationError, setValidationError] = useState<string | null>(null)

  const toastId = useId()
  const { toast } = useToast()

  const { data } = useQuery(queries.document.item(Number(id)))
  const { mutate: updateDocumentMutate } = useUpdateDocument(Number(id))

  const { documentTitle: title, editorMarkdownContent: content } = useEditDocumentContext()
  const { globalDirectoryId } = useDirectoryContext()

  useEffect(() => {
    if (validationError) {
      toast({ variant: 'error' }).update({
        id: toastId,
        title: validationError,
      })

      setValidationError(null)
    }
  }, [validationError])

  const validateUpdateDocument = (data: unknown) => {
    const result = UpdateDocumentSchema.safeParse(data)
    if (!result.success) {
      setValidationError(result.error.errors[0]?.message ?? 'create validation error')
      return false
    }
    setValidationError(null)
    return true
  }

  const handleClickSave = (id: number, title: string, content: string) => {
    const updateDocumentData: Document.Request.UpdateContent = {
      name: title,
      file: content,
    }

    if (!validateUpdateDocument(updateDocumentData)) {
      return
    }

    const updatePayload = { documentId: id, requestBody: updateDocumentData }

    updateDocumentMutate(updatePayload, {
      onSuccess: () => {
        router.push('/document/' + String(id))
        toast({}).update({
          id: toastId,
          title: '노트가 수정되었어요',
        })
      },
    })
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
            {data?.directory.emoji ?? data?.directory.emoji}{' '}
            {data?.directory.id === globalDirectoryId ? '전체 노트' : data?.directory.name}
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
