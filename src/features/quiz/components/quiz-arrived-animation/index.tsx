'use client'

import Icon from '@/shared/components/custom/icon'
import { motion } from 'framer-motion'

const QuizArrivedAnimation = () => {
  return (
    <motion.div
      className="absolute right-[11.59px] top-[22px] h-[123px] w-[125px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <motion.div
        className="absolute left-[-15px] top-0"
        initial={{ x: -5, y: -15 }}
        animate={{ x: 0, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Icon name="today-quiz-decoration" />
      </motion.div>

      <motion.div
        className="absolute bottom-0 right-0"
        initial={{ x: 40, y: -50 }}
        animate={{ x: 0, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Icon name="today-quiz" />
      </motion.div>
    </motion.div>
  )
}

export default QuizArrivedAnimation
