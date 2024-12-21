'use client'

import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import DayCheck from '../../components/today-quiz-check/day-check'
import { Button } from '@/shared/components/ui/button'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

interface Props {
  currentConsecutiveDays: number
  todayCheckData: {
    day: number
    isComplete: boolean
  }[]
}

const TodayQuizReward = ({ currentConsecutiveDays, todayCheckData }: Props) => {
  const router = useRouter()

  return (
    <div className="flex-center h-dvh w-dvw max-w-mobile flex-col overflow-y-auto bg-background-base-01 px-[16px] pb-[100px]">
      <div className="flex-center mt-[63px] flex-col">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.4,
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1],
            type: 'spring',
            stiffness: 100,
            damping: 10,
          }}
          className="ml-[12px]"
        >
          <Icon name="today-quiz" className="size-[100px]" />
        </motion.div>

        <div className="flex-center mt-[20.38px] flex-col gap-[12px]">
          <Text typography="title1" className="text-text-accent">
            연속 {(currentConsecutiveDays || 0) + 1}일 완료
          </Text>
          <Text typography="text1-medium" className="text-center text-text-secondary">
            오늘의 퀴즈를 완료할 때마다 별 5개를 드리고, <br />
            5일 연속 완료하면 20개를 드려요
          </Text>
        </div>
      </div>

      <DayCheck checkData={todayCheckData} currentConsecutiveDays={currentConsecutiveDays} />

      {/* TODO: 메인 화면으로 이동하면서 토스트 띄우기 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1.15,
          duration: 0.8,
          type: 'spring',
          stiffness: 100,
          damping: 15,
        }}
        className="mt-[32px] w-full max-w-[220px]"
      >
        <Button onClick={() => router.replace('/main')} className="w-full">
          별 5개 받기
        </Button>
      </motion.div>
    </div>
  )
}

export default TodayQuizReward
