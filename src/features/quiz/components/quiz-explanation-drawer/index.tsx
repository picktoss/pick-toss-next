import { useCallback, useEffect, useState } from 'react'
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion'
import { cn } from '@/shared/lib/utils'
import Icon from '@/shared/components/custom/icon'
import { Button } from '@/shared/components/ui/button'
import Text from '@/shared/components/ui/text'

interface QuizExplanationDrawerProps {
  isCorrect: boolean
  explanation: string
  correctAnswer?: string
}

const QuizExplanationDrawer = ({
  isCorrect,
  correctAnswer,
  explanation,
}: QuizExplanationDrawerProps) => {
  const [open, setOpen] = useState(true)
  const controls = useAnimation()
  const y = useMotionValue(0)
  const height = useMotionValue('80vh')

  const backgroundColor = useTransform(
    y,
    [-200, 0],
    ['#ffffff', open ? (isCorrect ? '#e6f7e3' : '#ebeff3') : '#ffffff']
  )

  const handleOpen = useCallback(async () => {
    await controls.start({ height: '80vh', y: 0 })
  }, [controls])

  const handleClose = async () => {
    setOpen(false)
    await controls.start({ height: '125px', y: 0 })
  }

  const handleDragEnd = async (
    _: MouseEvent,
    info: { velocity: { y: number }; offset: { y: number } }
  ) => {
    const shouldClose = info.velocity.y > 200 || info.offset.y > 100
    if (shouldClose) {
      await handleClose()
    } else {
      setOpen(true)
      await controls.start({ height: '80vh', y: 0 })
    }
  }

  useEffect(() => {
    void handleOpen()
  }, [handleOpen])

  return (
    <motion.div
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      style={{
        backgroundColor,
        y,
        height,
      }}
      animate={controls}
      initial={{ height: '125px' }}
      className="fixed bottom-0 w-full max-w-mobile select-none overflow-hidden rounded-t-[20px] px-4 shadow-[0_-3px_16px_0px_rgba(0,0,0,0.1)] transition-colors"
    >
      <div className="relative size-full">
        <motion.div
          className="mx-auto mt-[8px] h-[4px] w-[48px] cursor-grab rounded-full bg-icon-tertiary active:cursor-grabbing"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        />

        <motion.div
          className="mt-[24px]"
          initial={false}
          animate={{ opacity: open ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="flex items-center gap-[16px]"
            initial={{ x: 0 }}
            animate={{ x: open ? 0 : -20 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.5 }}
            >
              {isCorrect ? (
                <Icon name="correct-check-round" className="size-[48px]" />
              ) : (
                <Icon name="wrong-x-round" className="size-[48px]" />
              )}
            </motion.div>
            {isCorrect ? (
              <Text typography="title1" color="right">
                정답!
              </Text>
            ) : (
              <Text typography="title1" color="wrong">
                오답
              </Text>
            )}
          </motion.div>

          {!isCorrect && (
            <Text typography="subtitle2-bold" color="secondary" className="mt-[28px]">
              정답: {correctAnswer}
            </Text>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: open ? 1 : 0, y: open ? 0 : 20 }}
            transition={{ duration: 0.2 }}
          >
            <Text
              as="p"
              typography="text1-medium"
              className={cn(isCorrect ? 'mt-[28px]' : 'mt-[12px]')}
            >
              {explanation}
            </Text>
            <Text typography="text2-medium" color="sub" className="mt-[12px]">
              전공 공부 {'>'} 최근 이슈
            </Text>
          </motion.div>
        </motion.div>

        <motion.div
          initial={false}
          animate={{
            y: 0,
            top: open ? 'auto' : '24px',
          }}
          transition={{ duration: 0.3 }}
          className={cn('w-full', open ? 'mt-[40px]' : 'absolute')}
        >
          <Button className="w-full" onClick={handleClose}>
            다음
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default QuizExplanationDrawer
