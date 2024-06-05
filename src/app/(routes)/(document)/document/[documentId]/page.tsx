import { getDocument } from '@/apis/fetchers/document/get-document'
import { auth } from '@/app/api/auth/[...nextauth]/auth'
import { CommonLayout } from '@/components/common-layout'
import VisualViewport from '@/components/react/visual-viewport'
import { Viewer } from './components/viewer'
import { DocumentDetailProvider } from './contexts/document-detail-context'
import { AiPick } from './components/ai-pick'

interface Props {
  params: {
    documentId: string
  }
}

export default async function Document({ params: { documentId } }: Props) {
  const session = await auth()
  const { documentName, createdAt, content, keyPoints, status } = await getDocument({
    accessToken: session?.user.accessToken || '',
    documentId: Number(documentId),
  })

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
            <Viewer documentName={documentName} createdAt={createdAt} content={content} />

            <AiPick keyPoints={keyPoints} status={status} />
          </main>
        </DocumentDetailProvider>
      </CommonLayout>
    </VisualViewport>
  )
}
