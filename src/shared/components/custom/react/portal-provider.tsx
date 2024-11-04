'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface Prop {
  children: React.ReactNode
}

const PortalProvider = ({ children }: Prop) => {
  const id = useId()
  const portalRef = useRef<HTMLElement | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const portalRoot = document.getElementById(`portal-${id}`) || document.createElement('div')
    portalRoot.id = `portal-${id}`
    document.body.appendChild(portalRoot)
    portalRef.current = portalRoot
    setMounted(true)

    return () => {
      if (portalRef.current && portalRef.current.childNodes.length === 0) {
        document.body.removeChild(portalRef.current)
      }
    }
  }, [id])

  if (!mounted || !portalRef.current) return null

  return createPortal(children, portalRef.current)
}

export default PortalProvider
