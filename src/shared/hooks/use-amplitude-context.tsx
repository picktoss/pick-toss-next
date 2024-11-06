'use client'

import { useContext } from 'react'
import { useEffect, createContext, PropsWithChildren, useMemo } from 'react'
import { init, track } from '@amplitude/analytics-browser'
import { usePathname } from 'next/navigation'

const AMPLITUDE_API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY || ''

export interface Values {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trackAmplitudeEvent: (eventName: string, eventProperties?: Record<string, any>) => void
  clickedEvent: (props: {
    buttonName: string
    buttonType:
      | 'todayQuiz'
      | 'addDocument'
      | 'aiPickDialog'
      | 'myStar'
      | 'continuousQuizDates'
      | 'quizPractice'
      | 'topFive'
      | 'bookmark'
      | 'makeQuiz'
      | 'quizAnalysis'
      | 'pro'
    failed?: boolean
  }) => void
  documentCreatedEvent: (props: { length: number }) => void
  documentEditedEvent: (props: { length: number }) => void
  aiPickEvent: (props: { buttonName: string; isPickedAgain: boolean }) => void
  quizCompletedEvent: (props: {
    continuousQuizDates?: number
    date?: string
    quizType: 'practice' | 'today' | 'ox' | 'multiple'
  }) => void
  quizMadeEvent: (props: { quizType: 'ox' | 'multiple'; count: number }) => void
}

export const AmplitudeContext = createContext<Values | null>(null)

export const AmplitudeContextProvider = ({ children }: PropsWithChildren) => {
  const pathname = usePathname()

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      init(AMPLITUDE_API_KEY, undefined, {
        defaultTracking: {
          sessions: true,
        },
      })
    }
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const trackAmplitudeEvent = (eventName: string, eventProperties?: Record<string, any>) => {
    track(eventName, eventProperties)
  }

  const value = useMemo(
    () => ({
      trackAmplitudeEvent,

      clickedEvent: (props: {
        buttonName: string
        buttonType:
          | 'todayQuiz'
          | 'pro'
          | 'makeQuiz'
          | 'continuousQuizDates'
          | 'myStar'
          | 'addDocument'
          | 'quizPractice'
          | 'quizAnalysis'
          | 'topFive'
          | 'aiPickDialog'
          | 'bookmark'
        failed?: boolean
      }) => trackAmplitudeEvent('Clicked', { ...props, pathname }),

      documentCreatedEvent: (props: { length: number }) =>
        trackAmplitudeEvent('Document_Created', props),

      documentEditedEvent: (props: { length: number }) =>
        trackAmplitudeEvent('Document_Edited', props),

      aiPickEvent: (props: { buttonName: string; isPickedAgain: boolean }) =>
        trackAmplitudeEvent('AI_Pick', props),

      quizCompletedEvent: (props: {
        continuousQuizDates?: number
        date?: string
        quizType: 'practice' | 'today' | 'ox' | 'multiple'
      }) => trackAmplitudeEvent('Quiz_Completed', props),

      quizMadeEvent: (props: { quizType: 'ox' | 'multiple'; count: number }) =>
        trackAmplitudeEvent('Quiz_Made', props),
    }),
    [pathname]
  )

  return <AmplitudeContext.Provider value={value}>{children}</AmplitudeContext.Provider>
}

export const useAmplitudeContext = () => {
  const context = useContext(AmplitudeContext)
  if (context == null)
    throw new Error('useAmplitudeContext must be used within a AmplitudeContextProvider')

  return context
}
