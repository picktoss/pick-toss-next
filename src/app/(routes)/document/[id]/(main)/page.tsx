import DocumentDetailView from '@/features/document/screens/document-detail-view'
import { getDocumentDetail } from '@/requests/document/server'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    id: string
  }
  searchParams: {
    tab?: 'DOCUMENT_CONTENT' | 'QUIZ'
  }
}

const DocumentDetailPage = async ({ params, searchParams }: Props) => {
  const id = params.id
  const tab = searchParams.tab ?? 'DOCUMENT_CONTENT'
  const activeTab = ['DOCUMENT_CONTENT', 'QUIZ'].includes(tab) ? tab : 'DOCUMENT_CONTENT'

  const data = await getDocumentDetail(Number(id))

  if (!data) {
    return notFound()
  }

  return <DocumentDetailView documentId={Number(id)} activeTab={activeTab} />
}

export default DocumentDetailPage
