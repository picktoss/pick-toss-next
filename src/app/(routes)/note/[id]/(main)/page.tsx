import { QuizListProvider } from '@/features/note/contexts/quiz-list-context'
import NoteContent from '@/features/note/screens/note-content'
import Quiz from '@/features/note/screens/quiz'
import NoteDetailController from '@/features/note/components/note-detail-controller'
import NoteFloatingButton from '@/features/note/components/note-floating-button'

interface Props {
  searchParams: {
    tab: 'note-content' | 'quiz'
  }
}

const NoteDetailPage = ({ searchParams }: Props) => {
  const tab = searchParams.tab
  const activeTab = ['note-content', 'quiz'].includes(tab) ? tab : 'note-content'

  return (
    <main className="min-h-screen">
      <QuizListProvider>
        <NoteDetailController />

        {activeTab === 'note-content' && <NoteContent />}
        {activeTab === 'quiz' && <Quiz />}
      </QuizListProvider>

      <NoteFloatingButton />
    </main>
  )
}

export default NoteDetailPage
