'use client'

import { useUserStore } from '@/store/user'
import { useEffect } from 'react'

const Test = () => {
  const { userInfo } = useUserStore()
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(userInfo)
  }, [userInfo])
  return null
}

export default Test
