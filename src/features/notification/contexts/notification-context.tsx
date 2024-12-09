'use client'

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useMemo,
} from 'react'

interface NotificationContextType {
  switchStates: SwitchStates
  allowNotification: boolean
  offEmail: boolean
  setOffEmail: (off: boolean) => void
  handleAllowNotification: (checked: boolean) => void
  handleSwitchChange: (type: 'push' | 'email', name: string, checked: boolean) => void
}

interface SwitchStates {
  push: {
    todayQuiz: boolean
    wrongAnswerStatus: boolean
    inviteReward: boolean
    announcements: boolean
  }
  email: {
    todayQuiz: boolean
    announcements: boolean
  }
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [offEmail, setOffEmail] = useState(true)
  const [allowNotification, setAllowNotification] = useState(false)
  const [switchStates, setSwitchStates] = useState<SwitchStates>({
    push: {
      todayQuiz: false,
      wrongAnswerStatus: false,
      inviteReward: false,
      announcements: false,
    },
    email: {
      todayQuiz: false,
      announcements: false,
    },
  })

  useEffect(() => {
    const pushValues = Object.values(switchStates.push)
    const emailValues = Object.values(switchStates.email)
    setAllowNotification(pushValues.some(Boolean) || emailValues.some(Boolean))
  }, [switchStates])

  useEffect(() => {
    if (offEmail) {
      setSwitchStates((prev) => ({
        ...prev,
        email: {
          todayQuiz: false,
          announcements: false,
        },
      }))
    }
  }, [offEmail])

  const handleAllowNotification = useCallback((checked: boolean) => {
    setAllowNotification(checked)
    setSwitchStates({
      push: {
        todayQuiz: checked,
        wrongAnswerStatus: checked,
        inviteReward: checked,
        announcements: checked,
      },
      email: {
        todayQuiz: checked,
        announcements: checked,
      },
    })
  }, [])

  const handleSwitchChange = useCallback(
    (type: 'push' | 'email', name: string, checked: boolean) => {
      setSwitchStates((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          [name]: checked,
        },
      }))
    },
    []
  )

  const values = useMemo(
    () => ({
      switchStates,
      allowNotification,
      offEmail,
      setOffEmail,
      handleAllowNotification,
      handleSwitchChange,
    }),
    [switchStates, allowNotification, offEmail, handleAllowNotification, handleSwitchChange]
  )

  return <NotificationContext.Provider value={values}>{children}</NotificationContext.Provider>
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('NotificationProvider 내에서 사용해주세요')
  }
  return context
}
