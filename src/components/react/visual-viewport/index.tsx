'use client'

import { PropsWithChildren, useEffect, useState } from 'react'
import debounce from 'lodash.debounce'
import styles from './visual-viewport.module.css'

interface Props extends PropsWithChildren {
  hideYScrollbar?: boolean
}

const minKeypadHeight = 300

export default function VisualViewport({ children, hideYScrollbar }: Props) {
  const [isKeypadOpen, setIsKeypadOpen] = useState(false)

  useEffect(() => {
    if (document.documentElement.getAttribute('data-viewport-listener') === 'true') {
      return
    }

    function handleResize() {
      document.documentElement.style.setProperty(
        '--visual-viewport-vh',
        `${window.visualViewport!.height * 0.01}px`
      )

      if (window.innerHeight - window.visualViewport!.height >= minKeypadHeight) {
        setIsKeypadOpen(true)
      } else {
        setIsKeypadOpen(false)
      }
    }

    handleResize()

    const debouncedHandleResize = debounce(handleResize, 100)

    window.visualViewport!.addEventListener('resize', debouncedHandleResize)
    document.documentElement.setAttribute('data-viewport-listener', 'true')

    return () => {
      window.visualViewport!.removeEventListener('resize', debouncedHandleResize)
      document.documentElement.setAttribute('data-viewport-listener', 'false')
    }
  }, [])

  return (
    <div className={styles.visualViewportContainer}>
      {isKeypadOpen && <div className={styles.makeScrollable} />}
      <div
        className={styles.visualViewportContent}
        data-hide-y-scrollbar={hideYScrollbar ? 'true' : 'false'}
      >
        {children}
      </div>
    </div>
  )
}
