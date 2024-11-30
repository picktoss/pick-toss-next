/* eslint-disable @typescript-eslint/no-unused-vars */
import { FunctionComponent, PropsWithChildren, Suspense, useRef } from 'react'
import type { Metadata } from 'next'
import QuizIntro from '@/features/quiz/screen/intro'

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {
  params: {
    id: string
  }
  searchParams: {
    quizType: 'today' | 'document' | 'collection'
    documentId?: string
    collectionId?: string
  }
}

const Layout: FunctionComponent<LayoutProps> = ({ children, params, searchParams }) => {
  const { quizType, documentId, collectionId } = searchParams
  const hasAnimationCompleted = useRef(false)

  const handleAnimationComplete = () => {
    hasAnimationCompleted.current = true
  }

  return (
    <main>
      {!hasAnimationCompleted.current ? (
        <QuizIntro
          quizType={quizType}
          quizSetId={Number(params.id)}
          documentId={documentId ? Number(documentId) : undefined}
          collectionId={collectionId ? Number(collectionId) : undefined}
          onAnimationComplete={handleAnimationComplete}
        />
      ) : (
        <Suspense>{children}</Suspense>
      )}
    </main>
  )
}

export default Layout
