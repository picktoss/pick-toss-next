'use client'

import { createContext, useContext, useState, ReactNode, useMemo } from 'react'

export type Type = 'error' | 'payment' | 'coalition' | 'event' | 'userInfo' | 'cancel' | 'etc'

interface InquiryContextType {
  type: Type
  title: string
  content: string
  email: string
  isAgreeChecked: boolean
  setType: (type: Type) => void
  setTitle: (title: string) => void
  setContent: (content: string) => void
  setEmail: (email: string) => void
  setIsAgreeChecked: (checked: boolean) => void
}

const InquiryContext = createContext<InquiryContextType | undefined>(undefined)

export const InquiryProvider = ({ children }: { children: ReactNode }) => {
  const [type, setType] = useState<Type>('error')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [email, setEmail] = useState('')
  const [isAgreeChecked, setIsAgreeChecked] = useState(false)

  const values = useMemo(
    () => ({
      type,
      title,
      content,
      email,
      isAgreeChecked,
      setType,
      setTitle,
      setContent,
      setEmail,
      setIsAgreeChecked,
    }),
    [type, title, content, email, isAgreeChecked]
  )

  return <InquiryContext.Provider value={values}>{children}</InquiryContext.Provider>
}

export const useInquiry = () => {
  const context = useContext(InquiryContext)
  if (!context) {
    throw new Error('InquiryProvider 내에서 사용해주세요')
  }
  return context
}
