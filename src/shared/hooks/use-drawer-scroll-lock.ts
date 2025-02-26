import { useEffect } from 'react'

const useDrawerScrollLock = (isOpen: boolean) => {
  useEffect(() => {
    const disableTouchMove = (e: TouchEvent) => {
      if (isOpen) {
        e.preventDefault()
      }
    }

    const disableScroll = () => {
      document.body.style.overflow = 'hidden'
      document.body.style.height = '100%'
    }

    const enableScroll = () => {
      document.body.style.overflow = 'auto'
      document.body.style.height = ''
    }

    if (isOpen) {
      disableScroll()
      document.addEventListener('touchmove', disableTouchMove, { passive: false })
    } else {
      enableScroll()
      document.removeEventListener('touchmove', disableTouchMove)
    }

    return () => {
      enableScroll()
      document.removeEventListener('touchmove', disableTouchMove)
    }
  }, [isOpen])
}

export default useDrawerScrollLock
