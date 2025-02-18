'use client'

import Icon from '@/shared/components/custom/icon'
// import { motion } from 'framer-motion'

const Splash = () => {
  return (
    <div className="relative z-10 h-dvh w-screen max-w-mobile overflow-hidden bg-background-base-01">
      {/* <motion.div
        className="center"
        initial={{ x: 200, y: -100, opacity: 0 }}
        animate={{ x: '50%', y: '50%', opacity: 1 }}
        transition={{ duration: 0.5 }}
      > */}
      <Icon name="picktoss-color" className="center size-[139px]" />
      {/* </motion.div> */}
    </div>
  )
}

export default Splash
