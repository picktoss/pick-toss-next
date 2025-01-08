import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export const useCreateQuiz = (documentId: number | null) => {
  const router = useRouter()

  const [showCreatePopup, setShowCreatePopup] = useState(false)
  const [createError, setCreateError] = useState<string | null>(null)
  const [openExitDialog, setOpenExitDialog] = useState(false)

  const handleCreateError = (response: string) => {
    setShowCreatePopup(false)
    setCreateError(response)
  }

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      // ai 퀴즈 생성 팝업이 열려 있는 상태에서는 뒤로 가기 이벤트를 확인
      if (showCreatePopup) {
        event.preventDefault()
        window.history.pushState(null, '', window.location.href)

        setOpenExitDialog(true)
      }
    }

    if (showCreatePopup) {
      window.history.pushState(null, '', window.location.href)
      window.addEventListener('popstate', handlePopState)
    }

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [showCreatePopup, router, documentId])

  return {
    showCreatePopup,
    setShowCreatePopup,
    createError,
    setCreateError,
    openExitDialog,
    setOpenExitDialog,

    handleCreateError,
  }
}
