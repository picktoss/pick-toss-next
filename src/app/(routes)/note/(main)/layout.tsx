import { FunctionComponent, PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import BottomNavLayout from '@/shared/components/custom/bottom-nav-layout'
import { QuizNoteProvider } from '@/features/note/contexts/quiz-note-context'

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {
  header: React.ReactNode
}

const Layout: FunctionComponent<LayoutProps> = ({ header, children }) => {
  return (
    <BottomNavLayout where="퀴즈 노트">
      <div className="flex h-[calc(100dvh-88px)] w-full flex-col overflow-hidden bg-background-base-02 text-text-primary">
        <QuizNoteProvider>
          {header}
          {children}
        </QuizNoteProvider>
      </div>
    </BottomNavLayout>
  )
}

export default Layout