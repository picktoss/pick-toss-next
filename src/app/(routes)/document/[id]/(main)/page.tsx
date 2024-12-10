import DocumentDetailController from '@/features/document/components/document-detail-controller'
import DocumentFloatingButton from '@/features/document/components/document-floating-button'
import { QuizListProvider } from '@/features/document/contexts/quiz-list-context'
import DocumentContent from '@/features/document/screens/document-content'
import Quiz from '@/features/document/screens/quiz'
import { fetchDocumentDetail } from '@/requests/document/client'

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

  const data = await fetchDocumentDetail(Number(id))

  return (
    <main className="min-h-screen">
      <QuizListProvider>
        <DocumentDetailController />

        {activeTab === 'document-content' && <DocumentContent />}
        {activeTab === 'quiz' && <Quiz />}
      </QuizListProvider>

      <DocumentFloatingButton
        documentId={Number(id)}
        documentName={data?.documentName ?? ''}
        directoryEmoji={data?.directory.emoji ?? ''}
        savedQuizCount={data?.totalQuizCount ?? 0}
      />
    </main>
  )
}

export default DocumentDetailPage
