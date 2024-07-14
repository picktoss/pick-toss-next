'use client'
import { useEffect, createContext, PropsWithChildren } from 'react'
import { init, track } from '@amplitude/analytics-browser'

const AMPLITUDE_API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY || ''

export const AmplitudeContext = createContext({})

const AmplitudeContextProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    init(AMPLITUDE_API_KEY, undefined, {
      defaultTracking: {
        sessions: true,
      },
    })
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const trackAmplitudeEvent = (eventName: string, eventProperties?: Record<string, any>) => {
    track(eventName, eventProperties)
  }

  const value = { trackAmplitudeEvent }

  return <AmplitudeContext.Provider value={value}>{children}</AmplitudeContext.Provider>
}

export default AmplitudeContextProvider
