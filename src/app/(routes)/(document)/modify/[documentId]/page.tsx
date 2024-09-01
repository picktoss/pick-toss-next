'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { EditDocumentProvider } from '../contexts/edit-document-context'
import { Header } from '../components/header'
import Loading from '@/shared/components/loading'
import { TitleInput } from '../components/title-input'
import VisualEditor from '../components/visual-editor'
import { updateDocumentContent } from '@/actions/fetchers/document/update-document-content'
import { useState } from 'react'
import { useToast } from '@/shared/hooks/use-toast'
import { MAX_CONTENT_LENGTH, MIN_CONTENT_LENGTH } from '@/constants/document'
import { useAmplitudeContext } from '@/shared/hooks/use-amplitude-context'
import { queries } from '@/shared/lib/tanstack-query/query-keys'

export default function Modify() {
  const { documentId } = useParams()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { data: modifyTargetDocument } = useQuery({
    ...queries.document.item(Number(documentId)),
  })

  const { documentEditedEvent } = useAmplitudeContext()

  const { mutateAsync } = useMutation({
    mutationFn: (data: { name: string; file: File }) =>
      updateDocumentContent({
        documentId: Number(documentId),
        ...data,
      }),
  })

  const handleSubmit = async ({
    documentName,
    editorContent,
  }: {
    documentName: string
    editorContent: string
  }) => {
    if (
      documentName === modifyTargetDocument?.documentName &&
      editorContent === modifyTargetDocument?.content
    ) {
      router.push(`/document/${Number(documentId)}`)
    }

    if (isLoading || !documentName || !editorContent) {
      return
    }

    if (editorContent.length < MIN_CONTENT_LENGTH) {
      alert('최소 150자 이상의 본문을 입력해주세요.')
      return
    } else if (editorContent.length > MAX_CONTENT_LENGTH) {
      alert('본문의 길이는 15,000자를 넘길 수 없습니다.')
      return
    }

    setIsLoading(true)

    const documentBlob = new Blob([editorContent], { type: 'text/markdown' })
    const file = new File([documentBlob], `${documentName}.md`, { type: 'text/markdown' })

    await mutateAsync(
      {
        name: documentName,
        file,
      },
      {
        onSuccess: () => {
          documentEditedEvent({
            length: editorContent.length,
          })

          toast({
            description: '노트가 수정되었습니다',
          })
          router.push(`/document/${Number(documentId)}`)
        },
      }
    )
  }

  if (!modifyTargetDocument) {
    return <Loading center />
  }

  return (
    <EditDocumentProvider
      prevTitle={modifyTargetDocument.documentName}
      prevContent={modifyTargetDocument.content}
    >
      <Header
        categoryId={modifyTargetDocument?.category.id}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
      <div className="mt-[22px] min-h-screen rounded-t-[20px] bg-white shadow-sm">
        <TitleInput />
        <VisualEditor />
      </div>
    </EditDocumentProvider>
  )
}
