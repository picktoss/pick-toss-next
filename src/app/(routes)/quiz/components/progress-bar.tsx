'use client'

import { useEffect, useRef, useState } from 'react'
import debounce from 'lodash.debounce'

interface ProgressBarProps {
  curQuizIndex: number
  totalQuizCount: number
}

export default function ProgressBar({ curQuizIndex, totalQuizCount }: ProgressBarProps) {
  const [isOutOfContainer, setIsOutOfContainer] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const markerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && markerRef.current) {
        const markerRect = markerRef.current.getBoundingClientRect()
        const containerRect = containerRef.current.getBoundingClientRect()
        const tolerance = 1
        if (isOutOfContainer) {
          setIsOutOfContainer(markerRect.right + 48 > containerRect.right + tolerance)
        } else {
          setIsOutOfContainer(markerRect.right > containerRect.right + tolerance)
        }
      }
    }

    const debouncedHandleResize = debounce(handleResize, 300)

    handleResize()
    window.addEventListener('resize', debouncedHandleResize)
    return () => window.removeEventListener('resize', debouncedHandleResize)
  }, [curQuizIndex, totalQuizCount, isOutOfContainer])

  return (
    <div className="relative h-[8px] rounded-t-[12px] *:h-[8px]" ref={containerRef}>
      <div className="rounded-t-[12px] bg-gray-02" />
      <div
        className="absolute left-0 top-0 rounded-tl-[12px] bg-orange-04"
        style={{
          width: `${((curQuizIndex + 1) / totalQuizCount) * 100}%`,
        }}
      >
        <div
          className="absolute flex h-[24px] w-[48px] items-center justify-center bg-orange-04 text-small1-bold text-white transition-all"
          style={{
            right: isOutOfContainer ? 0 : -48,
            top: -24,
            borderRadius: isOutOfContainer ? '9999px 9999px 0 9999px' : '9999px 9999px 9999px 0',
          }}
          ref={markerRef}
        >
          {curQuizIndex + 1}/{totalQuizCount}
        </div>
      </div>
    </div>
  )
}
