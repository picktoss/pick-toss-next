import { useCallback, useEffect, useState } from 'react'
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion'
import { cn } from '@/shared/lib/utils'
import Icon from '@/shared/components/custom/icon'
import { Button } from '@/shared/components/ui/button'
import Text from '@/shared/components/ui/text'

interface QuizExplanationDrawerProps {
  isRight: boolean
  explanation: string
  onClickNext: () => void
  rightAnswer: string
  isPending?: boolean
}

const MIN_HEIGHT = '125px'
const MAX_HEIGHT = '85dvh'

const QuizExplanationDrawer = ({
  isRight,
  rightAnswer,
  explanation,
  onClickNext,
  isPending = false,
}: QuizExplanationDrawerProps) => {
  const [open, setOpen] = useState(true)
  const controls = useAnimation()
  const y = useMotionValue(0)
  const height = useMotionValue(MIN_HEIGHT)

  const backgroundColor = useTransform(
    y,
    [-200, 0],
    ['#ffffff', open ? (isRight ? '#e6f7e3' : '#ebeff3') : '#ffffff']
  )

  const handleOpen = useCallback(async () => {
    await controls.start({ height: MAX_HEIGHT, y: 0 })
  }, [controls])

  const handleClose = async () => {
    setOpen(false)
    await controls.start({ height: MIN_HEIGHT, y: 0 })
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
      await handleOpen()
    }
  }

  useEffect(() => {
    void handleOpen()
  }, [handleOpen])

  return (
    <motion.div
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.3}
      onDragEnd={handleDragEnd}
      style={{
        backgroundColor,
        y,
        height,
      }}
      animate={controls}
      initial={{ height: MIN_HEIGHT }}
      className="fixed bottom-0 w-full max-w-mobile select-none overflow-hidden rounded-t-[20px] px-4 shadow-[0_-4px_20px_0px_rgba(0,0,0,0.15)] transition-colors"
    >
      <div className="relative size-full">
        <div className="mx-auto mt-[8px] h-[4px] w-[48px] cursor-grab rounded-full bg-icon-tertiary active:cursor-grabbing" />

        <motion.div
          className="mt-[24px]"
          animate={{ opacity: open ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-[16px]">
            {isRight ? (
              <Icon name="correct-check-round" className="size-[48px]" />
            ) : (
              <Icon name="wrong-x-round" className="size-[48px]" />
            )}
            {isRight ? (
              <Text typography="title1" color="right">
                정답!
              </Text>
            ) : (
              <Text typography="title1" color="wrong">
                오답
              </Text>
            )}
          </div>

          {!isRight && (
            <Text typography="subtitle2-bold" color="secondary" className="mt-[28px]">
              정답: {rightAnswer}
            </Text>
          )}

          <div>
            <Text
              as="p"
              typography="text1-medium"
              className={cn(isRight ? 'mt-[28px]' : 'mt-[12px]')}
            >
              {explanation}
            </Text>
            <Text typography="text2-medium" color="sub" className="mt-[12px]">
              전공 공부 {'>'} 최근 이슈
            </Text>
          </div>
        </motion.div>

        <motion.div
          animate={{
            y: 0,
            top: open ? 'auto' : '24px',
          }}
          transition={{ duration: 0.3 }}
          className={cn('w-full', open ? 'mt-[40px]' : 'absolute')}
        >
          <Button className="w-full" onClick={onClickNext} disabled={isPending}>
            {/* TODO: isPending일 때, spinner 표시 */}
            다음
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default QuizExplanationDrawer
