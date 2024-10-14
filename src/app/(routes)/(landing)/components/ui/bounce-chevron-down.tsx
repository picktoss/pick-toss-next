'use client'

import { motion } from 'framer-motion'
import { LongChevronDownIcon } from '../../svgs'

export function BounceChevronDown({ className }: { className: HTMLElement['className'] }) {
  return (
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{
        ease: 'easeInOut',
        duration: 1,
        repeat: Infinity,
        repeatType: 'loop',
      }}
    >
      <LongChevronDownIcon className={className} />
    </motion.div>
  )
}
