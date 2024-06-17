'use client'

import { getDocument } from '@/apis/fetchers/document/get-document'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { EditDocumentProvider } from '../contexts/edit-document-context'
import { Header } from '../components/header'
import Loading from '@/components/loading'
import { TitleInput } from '../components/title-input'
import VisualEditor from '../components/visual-editor'

export default function Modify() {
  const { data: session } = useSession()
  const { documentId } = useParams()

  const { data: modifyTargetDocument } = useQuery({
    queryKey: ['document', Number(documentId)],
    queryFn: () =>
      getDocument({
        accessToken: session?.user.accessToken || '',
        documentId: Number(documentId),
      }),
  })

  if (!modifyTargetDocument) {
    return <Loading center />
  }

  return (
    <EditDocumentProvider
      prevTitle={modifyTargetDocument.documentName}
      prevContent={modifyTargetDocument.content}
    >
      <Header categoryId={modifyTargetDocument?.category.id} />
      <div className="mt-[22px] min-h-screen rounded-t-[20px] bg-white shadow-sm">
        <TitleInput />
        <VisualEditor />
      </div>
    </EditDocumentProvider>
  )
}
