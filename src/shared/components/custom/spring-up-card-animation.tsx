'use client'

import { cn } from '@/shared/lib/utils'
import { motion } from 'framer-motion'
import React from 'react'

interface Props {
  className: HTMLElement['className']
  cardName: React.ReactNode
  createdAt: React.ReactNode
  image: React.ReactNode
  onAnimationComplete: () => void
}

/** className : 카드 요소에 적용 */
const SpringUpCardAnimation = ({
  className,
  cardName,
  createdAt,
  image,
  onAnimationComplete,
}: Props) => {
  return (
    <>
      <motion.div
        className={cn(
          'flex-center h-[420px] w-[320px] flex-col gap-[58px] rounded-[24px] bg-[var(--color-blue-600)]',
          className
        )}
        initial={{ y: '700px', scaleX: 0, opacity: 0 }}
        animate={{ y: '0%', scaleX: 1, opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        onAnimationComplete={onAnimationComplete}
      ></motion.div>

      <div className="center flex-center h-[420px] w-[320px] flex-col gap-[58px] px-[25px]">
        <motion.div
          className="flex-center flex-col gap-[10px] text-center"
          initial={{ y: '500px', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{
            delay: 0.1,
            duration: 0.5,
            ease: [0.25, 0.1, 0.3, 1],
          }}
        >
          {cardName}
          {createdAt}
        </motion.div>

        <motion.div
          initial={{ y: '500px', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{
            delay: 0.1,
            duration: 0.5,
            ease: [0.25, 0.1, 0.3, 1],
          }}
        >
          {image}
        </motion.div>
      </div>
    </>
  )
}

export default SpringUpCardAnimation
