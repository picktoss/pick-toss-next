'use client'

import { CommonLayout } from '@/components/common-layout'
import VisualViewport from '@/components/react/visual-viewport'
import { Viewer } from './components/viewer'
import { DocumentDetailProvider } from './contexts/document-detail-context'
import { AiPick } from './components/ai-pick'
import Loading from '@/components/loading'
import { useGetDocument } from '@/apis/fetchers/document/get-document/query'

interface Props {
  params: {
    documentId: string
  }
}

export default function Document({ params: { documentId } }: Props) {
  const { data: document } = useGetDocument({ documentId: Number(documentId) })

  if (!document)
    return (
      <div className="relative size-full h-screen">
        <Loading center />
      </div>
    )

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
