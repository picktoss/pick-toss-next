'use client'

import { FunctionComponent, PropsWithChildren, Suspense, useRef } from 'react'
import QuizIntro from '@/features/quiz/screen/intro'

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
