'use client'

import { useDocumentDetailContext } from '../contexts/document-detail-context'
import { useMediaQuery } from '@/shared/hooks/use-media-query'
import { useEffect } from 'react'
import AiPickContentDesktop from './ai-pick-content-desktop'
import AiPickContentMobile from './ai-pick-content-mobile'

// AiPick 컴포넌트
const AiPick = () => {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const { setIsPickOpen } = useDocumentDetailContext()

  useEffect(() => {
    if (isDesktop) {
      setIsPickOpen(true)
    }
  }, [isDesktop, setIsPickOpen])

  return isDesktop ? <AiPickContentDesktop /> : <AiPickContentMobile />
}

export default AiPick
