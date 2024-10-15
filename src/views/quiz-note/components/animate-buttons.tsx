'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Button, ButtonProps } from '@/shared/components/ui/button'
import Icon, { IconProps } from '@/shared/components/icon'
import { useEffect, useState } from 'react'
import { cn } from '@/shared/lib/utils'
import { addNoteButtons } from '../constants/add-note-buttons'
import { useQuizNoteContext } from '../context/quiz-note-context'
import Text from '@/shared/components/ui/text'
import { AddNoteProps } from './add-note-menu'

type Custom = number | 'plus' | 'cancel'

// AnimatedButtons 컴포넌트
const AnimatedButtons = ({ isExpanded, setIsExpanded }: AddNoteProps) => {
  const [isFirstRender, setIsFirstRender] = useState(true)
  const { buttonHidden } = useQuizNoteContext()

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
            'absolute text-text-primary-inverse text-sm opacity-0 transition-all duration-500 right-[64px]',
            isExpanded && 'opacity-100 z-40',
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
        'fixed w-full bottom-[120px] right-[22px] z-50 opacity-100',
        buttonHidden && 'z-0'
      )}
    >
      <AnimatePresence>
        {!isExpanded &&
          renderMotionButton(
            'plus',
            'plus',
            'plus',
            { variant: 'mediumIcon', colors: 'special' },
            () => setIsExpanded(true)
          )}

        {isExpanded && (
          <>
            {renderMotionButton(
              'cancel',
              'cancel',
              'cancel',
              { variant: 'mediumIcon', colors: 'tertiary' },
              () => setIsExpanded(false)
            )}

            {addNoteButtons.map((button) =>
              renderMotionButton(
                button.key,
                button.position,
                button.key,
                {
                  variant: 'mediumIcon',
                  colors: 'outlined',
                },
                () => alert('clicked button ' + button.key),
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
