'use client'

import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import { useEffect, useState } from 'react'

interface Props {
  day: number
  isComplete: boolean
  isLast?: boolean
  isReward?: boolean
}

const DayItem = ({ day, isComplete, isLast, isReward }: Props) => {
  const [isTransitioned, setIsTransitioned] = useState(false)
  // 추후 단가 측정 후 변경될 수 있음
  const REWARD = 5
  const LAST_REWARD = 20

  useEffect(() => {
    if (isReward) {
      const transitionTimer = setTimeout(() => setIsTransitioned(true), 1150)
      return () => clearTimeout(transitionTimer)
    }
  }, [isReward])

  return (
    <div className="flex-center flex-col">
      <Text typography="text1-medium" className="text-text-caption">
        {day}일
      </Text>

      {isReward ? (
        <div
          className={cn(
            'flex-center mt-[8px] size-[40px] rounded-full transition-all duration-800 bg-[#EAECEF]',
            isTransitioned && 'bg-fill-secondary-orange'
          )}
        >
          {isTransitioned ? (
            <Icon name="check-round" className="text-white" />
          ) : (
            <Text
              typography="text2-bold"
              className={cn(isLast ? 'text-[#FB7E20]' : 'text-[#797D81]')}
            >
              +{isLast ? LAST_REWARD : REWARD}
            </Text>
          )}
        </div>
      ) : isComplete ? (
        <div className="flex-center mt-[8px] size-[40px] rounded-full bg-fill-secondary-orange">
          <Icon name="check-round" className="text-white" />
        </div>
      ) : (
        <div className="flex-center mt-[8px] size-[40px] rounded-full bg-[#EAECEF]">
          <Text
            typography="text2-bold"
            className={cn(isLast ? 'text-[#FB7E20]' : 'text-[#797D81]')}
          >
            +{isLast ? LAST_REWARD : REWARD}
          </Text>
        </div>
      )}
    </div>
  )
}

export default DayItem
