import DocumentDetailView from '@/features/document/screens/document-detail-view'
import { getDocumentDetail } from '@/requests/document/server'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    id: string
  }
  searchParams: {
    tab?: 'document-content' | 'quiz'
  }
}

const DocumentDetailPage = async ({ params, searchParams }: Props) => {
  const id = params.id
  const tab = searchParams.tab ?? 'document-content'
  const activeTab = ['document-content', 'quiz'].includes(tab) ? tab : 'document-content'

  const data = await getDocumentDetail(Number(id))

  if (!data) {
    return notFound()
  }

  return <DocumentDetailView documentId={Number(id)} activeTab={activeTab} />
}

export default DocumentDetailPage
