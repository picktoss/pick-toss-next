import DocumentDetailController from '@/features/document/components/document-detail-controller'
import DocumentFloatingButton from '@/features/document/components/document-floating-button'
import { QuizListProvider } from '@/features/document/contexts/quiz-list-context'
import DocumentContent from '@/features/document/screens/note-content'
import Quiz from '@/features/document/screens/quiz'

interface Props {
  searchParams: {
    tab: 'document-content' | 'quiz'
  }
}

const DocumentDetailPage = ({ searchParams }: Props) => {
  const tab = searchParams.tab
  const activeTab = ['document-content', 'quiz'].includes(tab) ? tab : 'document-content'

  return (
    <main className="min-h-screen">
      <QuizListProvider>
        <DocumentDetailController />

        {activeTab === 'document-content' && <DocumentContent />}
        {activeTab === 'quiz' && <Quiz />}
      </QuizListProvider>

      <DocumentFloatingButton />
    </main>
  )
}

export default DocumentDetailPage
