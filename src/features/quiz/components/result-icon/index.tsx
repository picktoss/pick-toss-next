'use client'

import Icon from '@/shared/components/custom/icon'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { UNTIL_EXPLANATION_DRAWER_OPEN } from '../../config'

interface Props {
  isCorrect: boolean
}

const ResultIcon = ({ isCorrect }: Props) => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
    }, UNTIL_EXPLANATION_DRAWER_OPEN)

    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  const iconVariants = {
    initial: {
      scale: 0,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        scale: {
          type: 'spring',
          damping: 10,
          stiffness: 100,
          duration: 0.4,
        },
        opacity: {
          duration: 0.2,
        },
      },
    },
  }

  return (
    <div className="center z-50">
      <AnimatePresence mode="wait">
        {isCorrect && (
          <motion.div
            key="correct"
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Icon name="correct-check-round" className="size-[80px]" />
          </motion.div>
        )}
        {!isCorrect && (
          <motion.div
            key="wrong"
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Icon name="wrong-x-round" className="size-[80px]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ResultIcon
