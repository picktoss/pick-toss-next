'use client'

import { motion } from 'framer-motion'
import { LongChevronDownIcon } from '../../svgs'

export function BounceChevronDown() {
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
      <LongChevronDownIcon />
    </motion.div>
  )
}
