'use client'

import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import { EditDocumentProvider } from '../contexts/edit-document-context'
import { Header } from '../components/header'
import Loading from '@/components/loading'
import { TitleInput } from '../components/title-input'
import VisualEditor from '../components/visual-editor'
import { updateDocumentContent } from '@/apis/fetchers/document/update-document-content/fetcher'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '@/components/ui/toast'
import { useGetDocumentQuery } from '@/apis/fetchers/document/get-document/query'

export default function Modify() {
  const { data: session } = useSession()
  const { documentId } = useParams()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { data: modifyTargetDocument } = useGetDocumentQuery({ documentId: Number(documentId) })

  const { mutateAsync } = useMutation({
    mutationFn: (data: { name: string; file: File }) =>
      updateDocumentContent({
        accessToken: session?.user.accessToken || '',
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
          const handleActionClick = () => {
            // TODO: AI Pick 다시 생성하기 로직 구현 필요
          }

          toast({
            description: '노트가 수정되었습니다',
            action: (
              <ToastAction altText="AI Pick 다시 생성하기" onClick={handleActionClick}>
                AI <i>p</i>ick 다시 생성하기
              </ToastAction>
            ),
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
      <Header categoryId={modifyTargetDocument?.category.id} handleSubmit={handleSubmit} />
      <div className="mt-[22px] min-h-screen rounded-t-[20px] bg-white shadow-sm">
        <TitleInput />
        <VisualEditor />
      </div>
    </EditDocumentProvider>
  )
}
