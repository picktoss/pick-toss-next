'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Button, ButtonProps } from '@/shared/components/ui/button'
import Icon, { IconProps } from '@/shared/components/custom/icon'
import { useEffect, useState } from 'react'
import { cn } from '@/shared/lib/utils'
import { useDirectoryContext } from '../../contexts/directory-context'
import Text from '@/shared/components/ui/text'
import { useRouter } from 'next/navigation'
import { addDocumentButtons } from '../../config'

type Custom = number | 'plus' | 'cancel'

// AnimatedButtons 컴포넌트
const AnimatedButtons = () => {
  const router = useRouter()
  const [isFirstRender, setIsFirstRender] = useState(true)
  const { buttonHidden, isExpandedBtns, setIsExpandedBtns } = useDirectoryContext()

  useEffect(() => {
    setIsFirstRender(false)
  }, [])

  const buttonVariants = {
    hidden: (custom: Custom) => ({
      opacity: 0,
      y: custom === 'plus' ? -212 : 0,
    }),
    visible: (custom: Custom) => ({
      opacity: 1,
      y: typeof custom === 'number' ? custom * -1 : 0,
      zIndex: typeof custom === 'number' ? custom : 300,
      transition: {
        type: 'spring',
        bounce: 0.1,
        duration: 0.5,
      },
    }),
    exit: (custom: Custom) => ({
      opacity: 0,
      y: custom === 'plus' ? -212 : 0,
      transition: { duration: 0.3 },
    }),
  }

  const renderMotionButton = (
    key: string,
    custom: number | 'plus' | 'cancel',
    iconName: IconProps['name'],
    buttonProps: {
      variant: ButtonProps['variant']
      colors: ButtonProps['colors']
      className?: string
    },
    handleTap?: () => void,
    text?: { bottomCss: string; content: string }
  ) => (
    <div key={key} className="absolute bottom-0 right-0 w-full">
      <motion.div
        custom={custom}
        variants={buttonVariants}
        initial={isFirstRender && custom === 'plus' ? false : 'hidden'}
        animate="visible"
        exit="exit"
        className="absolute bottom-0 right-0"
        onTap={handleTap}
      >
        <Button {...buttonProps}>
          <Icon
            name={iconName}
            className={cn('size-[24px]', key === 'plus' && 'text-text-primary-inverse')}
          />
        </Button>
      </motion.div>

      {text && (
        <Text
          className={cn(
            'absolute text-text-primary-inverse text-sm opacity-0 transition-all right-[64px]',
            isExpandedBtns && 'opacity-100',
            text.bottomCss
          )}
        >
          {text.content}
        </Text>
      )}
    </div>
  )

  return (
    <div
      className={cn(
        'absolute w-full bottom-[120px] right-[22px] z-50 pointer-events-auto',
        buttonHidden && 'z-0'
      )}
    >
      <AnimatePresence>
        {!isExpandedBtns &&
          renderMotionButton(
            'plus',
            'plus',
            'plus',
            {
              variant: 'mediumIcon',
              colors: 'special',
              className: 'bg-gradient-to-r from-blue-400 via-none to-orange-500',
            },
            () => setIsExpandedBtns(true)
          )}

        {isExpandedBtns && (
          <>
            {renderMotionButton(
              'cancel',
              'cancel',
              'cancel',
              { variant: 'mediumIcon', colors: 'tertiary' },
              () => setIsExpandedBtns(false)
            )}

            {addDocumentButtons.map((button) =>
              renderMotionButton(
                button.key,
                button.position,
                button.key,
                {
                  variant: 'mediumIcon',
                  colors: 'outlined',
                },
                () => router.push(button.href),
                button.text
              )
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AnimatedButtons
