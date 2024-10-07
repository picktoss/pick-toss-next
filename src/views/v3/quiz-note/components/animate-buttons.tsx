'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Button, ButtonProps } from '@/shared/components/ui/button'
import Icon, { IconProps } from '@/shared/components/v3/icon'
import { useEffect, useState } from 'react'
import { cn } from '@/shared/lib/utils'
import { addNoteButtons } from '../constants/add-note-buttons'
import { useQuizNoteContext } from '../context/quiz-note-context'

type Custom = number | 'plus' | 'cancel'

interface Props {
  isExpanded: boolean
  setIsExpanded: (isExpanded: boolean) => void
}

// AnimatedButtons 컴포넌트
const AnimatedButtons = ({ isExpanded, setIsExpanded }: Props) => {
  const [isFirstRender, setIsFirstRender] = useState(true)
  const { isDrawerOpen } = useQuizNoteContext()

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
    handleTap?: () => void
  ) => (
    <motion.div
      key={key}
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
  )

  // 임시
  // 뷰포트가 달라져도 fixed 버튼 서비스 영역 내에 위치시킬 방법 생각해봐야함
  const isDesktop = false

  return (
    <div
      className={cn(
        'fixed bottom-[120px] right-[22px] z-50',
        isDrawerOpen && 'hidden',
        isDesktop && 'right-1/2 translate-x-[192px]'
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
                () => alert('clicked button ' + button.key)
              )
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AnimatedButtons
