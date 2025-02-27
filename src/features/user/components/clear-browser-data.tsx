'use client'

import { LOCAL_KEY } from '@/constants'
import { clearAllCookies, removeLocalStorage } from '@/shared/utils/storage'
import { useEffect } from 'react'

const ClearBrowserData = () => {
  useEffect(() => {
    removeLocalStorage(LOCAL_KEY.USER_STORAGE)
    removeLocalStorage(LOCAL_KEY.AUTH_STORAGE)
    clearAllCookies()
  }, [])

  return null
}

export default ClearBrowserData
