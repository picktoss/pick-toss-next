'use client'

import Icon from '@/shared/components/custom/icon'
import { motion } from 'framer-motion'

const Splash = () => {
  return (
    <div className="fixed right-1/2 z-50 h-dvh w-screen max-w-mobile translate-x-1/2 overflow-hidden bg-background-base-01">
      <motion.div
        className="center"
        initial={{ x: 200, y: -120, opacity: 0 }}
        animate={{ x: '50%', y: '50%', opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Icon name="picktoss-color" className="center size-[139px]" />
      </motion.div>
    </div>
  )
}
export default Splash
