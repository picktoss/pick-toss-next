'use client'

import { createContext, useContext, useState, ReactNode, useMemo } from 'react'

interface EmailVerificationContextType {
  isEmailFocused: boolean
  email: string
  isValid: boolean
  isAllowed: null | boolean
  activeSaveButton: boolean
  setIsEmailFocused: (value: boolean) => void
  setEmail: (email: string) => void
  setIsValid: (value: boolean) => void
  setIsAllowed: (value: null | boolean) => void
  setActiveSaveButton: (value: boolean) => void
}

const EmailVerificationContext = createContext<EmailVerificationContextType | undefined>(undefined)

export const EmailVerificationProvider = ({ children }: { children: ReactNode }) => {
  const [isEmailFocused, setIsEmailFocused] = useState(false)
  const [email, setEmail] = useState<string>('')
  const [isValid, setIsValid] = useState<boolean>(false)

  const [isAllowed, setIsAllowed] = useState<null | boolean>(true)
  const [activeSaveButton, setActiveSaveButton] = useState(false)

  const values = useMemo(
    () => ({
      isEmailFocused,
      setIsEmailFocused,
      email,
      setEmail,
      isValid,
      setIsValid,
      isAllowed,
      setIsAllowed,
      activeSaveButton,
      setActiveSaveButton,
    }),
    [
      isEmailFocused,
      setIsEmailFocused,
      email,
      setEmail,
      isValid,
      setIsValid,
      isAllowed,
      setIsAllowed,
      activeSaveButton,
      setActiveSaveButton,
    ]
  )

  return (
    <EmailVerificationContext.Provider value={values}>{children}</EmailVerificationContext.Provider>
  )
}

export const useEmailVerification = () => {
  const context = useContext(EmailVerificationContext)
  if (!context) {
    throw new Error('EmailVerificationProvider 내에서 사용해주세요')
  }
  return context
}
