'use client'

import { useEffect, useState } from 'react'
import AppStartView from './app-start'
import { useSession } from 'next-auth/react'
import Splash from './splash'
import { useRouter } from 'next/navigation'
import { setTimeout } from 'timers'

const Landing = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isReady, setIsReady] = useState(false)

  // iOS에서 useEffect가 지연되는 문제 해결
  useEffect(() => {
    const handleWakeUp = () => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          if (session?.user) {
            setIsReady(true)
          }
        }, 500)
      })
    }

    handleWakeUp()
  }, [session?.user])

  // 세션이 있으면 /main으로 이동 (iOS에서 클릭 없이 실행 보장)
  useEffect(() => {
    if (isReady) {
      requestAnimationFrame(() => {
        router.replace('/main')
      })
    }
  }, [isReady])

  // ✅ Splash 애니메이션 후 상태 변경
  if (status === 'loading' || !isReady) {
    return <Splash />
  }

  // ✅ 세션이 없으면 로그인 화면(AppStartView) 표시
  if (!session?.user) {
    return <AppStartView />
  }
  // const { data: session, status } = useSession()
  // const router = useRouter()
  // const [isReady, setIsReady] = useState(false) // 강제 리렌더링을 위한 state

  // useEffect(() => {
  //   const handleWakeUp = () => {
  //     requestAnimationFrame(() => {
  //       setTimeout(() => {
  //         setIsReady(true)
  //       }, 500) // 0.5초 후에 Splash 제거
  //     })
  //   }

  //   handleWakeUp()
  // }, [])

  // // ipadOS용 route재설정
  // useEffect(() => {
  //   if (session?.user) {
  //     setIsReady(true) // 상태 변경
  //   }
  // }, [session?.user])

  // useEffect(() => {
  //   if (isReady) {
  //     router.replace('/main')
  //   }
  // }, [isReady])

  // if (status === 'loading') {
  //   return <Splash />
  // }

  // if (!session?.user) {
  //   return <AppStartView />
  // }

  // // default
  // return <Splash />
}

export default Landing
