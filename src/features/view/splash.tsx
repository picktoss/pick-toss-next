'use client'

import Icon from '@/shared/components/custom/icon'
import { motion } from 'framer-motion'

interface Props {
  setShowSplash?: (value: boolean) => void
}

const Splash = ({ setShowSplash }: Props) => {
  return (
    <div className="fixed left-0 top-0 z-50 h-dvh w-screen overflow-hidden bg-background-base-01">
      <motion.div
        className="center"
        initial={{ x: 200, y: -120, opacity: 0 }}
        animate={{ x: '50%', y: '50%', opacity: 1 }}
        onAnimationComplete={() => setShowSplash && setShowSplash(false)}
        transition={{ duration: 0.5 }}
      >
        <Icon name="picktoss-color" className="center size-[139px]" />
      </motion.div>
    </div>
  )
}
export default Splash
