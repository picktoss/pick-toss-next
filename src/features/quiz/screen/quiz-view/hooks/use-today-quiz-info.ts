import { todayQuizCheckList } from '@/features/quiz/config'
import { useMemo, useState } from 'react'

const useTodayQuizInfo = () => {
  const defaultReward = 5

  const [todayQuizInfo, setTodayQuizInfo] = useState<{
    reward: number
    currentConsecutiveDays: number
  } | null>(null)

  const updatedConsecutiveDays = useMemo(
    () => todayQuizInfo?.currentConsecutiveDays ?? 1,
    [todayQuizInfo?.currentConsecutiveDays]
  )

  const divided5Days = useMemo(() => {
    const remainder = updatedConsecutiveDays % 5
    if (updatedConsecutiveDays > 1 && remainder === 0) {
      return 5
    }

    return remainder
  }, [updatedConsecutiveDays])

  const prevConsecutiveDays = useMemo(() => divided5Days - 1, [divided5Days])

  const todayCheckData = useMemo(
    () =>
      todayQuizCheckList.map((checkItem) => {
        if (checkItem.day <= prevConsecutiveDays) {
          return { ...checkItem, isComplete: true }
        }
        return { ...checkItem }
      }),
    [prevConsecutiveDays]
  )

  return {
    defaultReward,
    todayQuizInfo,
    setTodayQuizInfo,
    updatedConsecutiveDays,
    prevConsecutiveDays,
    todayCheckData,
  }
}

export default useTodayQuizInfo
