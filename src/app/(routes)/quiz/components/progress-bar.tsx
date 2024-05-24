'use client'

import { useEffect, useRef, useState } from 'react'
import debounce from 'lodash.debounce'
import { motion } from 'framer-motion'

interface ProgressBarProps {
  curQuizIndex: number
  totalQuizCount: number
}

const markerWidth = 48

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
          setIsOutOfContainer(markerRect.right + markerWidth > containerRect.right + tolerance)
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
      <motion.div
        className="absolute left-0 top-0 rounded-tl-[12px] bg-orange-04"
        style={{
          width: `${((curQuizIndex + 1) / totalQuizCount) * 100}%`,
        }}
        initial={{ width: `${(curQuizIndex / totalQuizCount) * 100}%` }}
        animate={{ width: `${((curQuizIndex + 1) / totalQuizCount) * 100}%` }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div
          className="absolute flex h-[24px] items-center justify-center bg-orange-04 text-small1-bold text-white transition-all"
          style={{
            width: markerWidth,
            right: isOutOfContainer ? 0 : -markerWidth,
            top: -24,
            borderRadius: isOutOfContainer ? '9999px 9999px 0 9999px' : '9999px 9999px 9999px 0',
          }}
          ref={markerRef}
        >
          {curQuizIndex + 1}/{totalQuizCount}
        </div>
      </motion.div>
    </div>
  )
}
