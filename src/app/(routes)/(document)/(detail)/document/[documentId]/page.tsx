'use client'

import { getDocument } from '@/apis/fetchers/document/get-document'
import { CommonLayout } from '@/components/common-layout'
import VisualViewport from '@/components/react/visual-viewport'
import { Viewer } from './components/viewer'
import { DocumentDetailProvider } from './contexts/document-detail-context'
import { AiPick } from './components/ai-pick'
import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import Loading from '@/components/loading'

interface Props {
  params: {
    documentId: string
  }
}

export default function Document({ params: { documentId } }: Props) {
  const { data: session } = useSession()
  const { data: document } = useQuery({
    queryKey: ['document', documentId],
    queryFn: () =>
      getDocument({
        accessToken: session?.user.accessToken || '',
        documentId: Number(documentId),
      }),
    enabled: !!session?.user.accessToken,
  })

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
