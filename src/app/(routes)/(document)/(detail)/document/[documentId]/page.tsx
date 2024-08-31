'use client'

import { CommonLayout } from '@/shared/components/common-layout'
import VisualViewport from '@/shared/components/react/visual-viewport'
import { Viewer } from './components/viewer'
import { DocumentDetailProvider } from './contexts/document-detail-context'
import { AiPick } from './components/ai-pick'
import Loading from '@/shared/components/loading'
import { useGetDocumentQuery } from '@/apis/fetchers/document/get-document/query'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    documentId: string
  }
}

export default function Document({ params: { documentId } }: Props) {
  const { data: document, isError } = useGetDocumentQuery({ documentId: Number(documentId) })

  if (isError) {
    notFound()
  }

  if (!document)
    return (
      <div className="relative size-full h-screen">
        <Loading center />
      </div>
    )

  if (isError) {
    notFound()
  }

  const { documentName, status, createdAt, content, keyPoints } = document

  return (
    <VisualViewport hideYScrollbar>
      <CommonLayout
        hideHeader
        mobileOptions={{
          hasBackButton: true,
        }}
      >
        <DocumentDetailProvider>
          <main className="flex h-screen justify-center">
            <Viewer
              documentName={documentName}
              status={status}
              createdAt={createdAt}
              content={content}
            />

            <AiPick initKeyPoints={keyPoints} initStatus={status} />
          </main>
        </DocumentDetailProvider>
      </CommonLayout>
    </VisualViewport>
  )
}
